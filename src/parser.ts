import { Parser as NearleyParser, Grammar as NearleyGrammar } from 'nearley';
import { JSONSchema7 } from 'json-schema';

import { isString } from './shared/utils';
import { Grammar as MySQLGrammarRules } from './mysql/language';
import { format as MySQLCompactFormatter } from './mysql/formatter/compact';
import { format as MySQLJSONSchemaFormatter } from './mysql/formatter/json-schema';

import { CompactJSONFormat, CompactFormatter } from './typings/compact';
import { JSONSchemaFormatOptions, JSONSchemaFileOptions, JSONSchemaFormatter } from './typings/json-schema';
import { P_MAIN, P_DDS } from './typings/parsed';

/**
 * Main Parser class, wraps nearley parser main methods.
 */
export class Parser {
  private compiledGrammar!: NearleyGrammar;

  private parser!: NearleyParser;

  private jsonSchemaFormatter!: JSONSchemaFormatter;

  private compactFormatter!: CompactFormatter;

  /**
   * Parsed statements.
   */
  private statements: string[] = [];

  /**
   * Remains of string feed, after last parsed statement.
   */
  private remains = '';

  /**
   * Whether preparser is currently escaped.
   */
  private escaped = false;

  /**
   * Current quote char of preparser.
   */
  private quoted = '';

  /**
   * Parser constructor.
   * Default dialect is 'mysql'.
   *
   * @param dialect SQL dialect ('mysql' or 'mariadb' currently supported).
   */
  constructor(dialect: 'mysql' | 'mariadb' = 'mysql') {
    if (!dialect || dialect === 'mysql' || dialect === 'mariadb') {
      this.compiledGrammar = NearleyGrammar.fromCompiled(MySQLGrammarRules);
      this.compactFormatter = MySQLCompactFormatter;
      this.jsonSchemaFormatter = MySQLJSONSchemaFormatter;
    } else {
      throw new TypeError(
        `Unsupported SQL dialect given to parser: '${dialect}. ` +
          "Please provide 'mysql', 'mariadb' or none to use default.",
      );
    }

    this.resetParser();
  }

  /**
   * Feed chunk of string into parser.
   *
   * @param chunk Chunk of string to be parsed.
   */
  feed(chunk: string): Parser {
    let i;
    let char;
    let parsed = '';
    let lastStatementIndex = 0;

    for (i = 0; i < chunk.length; i += 1) {
      char = chunk[i];
      parsed += char;

      if (char === '\\') {
        this.escaped = !this.escaped;
      } else {
        if (!this.escaped && Parser.isQuoteChar(char)) {
          if (this.quoted) {
            if (this.quoted === char) {
              this.quoted = '';
            }
          } else {
            this.quoted = char;
          }
        } else if (char === ';' && !this.quoted) {
          const statement = this.remains + parsed.substr(lastStatementIndex, i + 1);
          this.statements.push(statement);
          this.remains = '';
          lastStatementIndex = i + 1;
        }

        this.escaped = false;
      }
    }

    this.remains += parsed.substr(lastStatementIndex);

    return this;
  }

  /**
   * Recreates NearleyParser using grammar given in constructor.
   */
  resetParser(): void {
    this.parser = new NearleyParser(this.compiledGrammar);
  }

  /**
   * Checks whether character is a quotation character.
   *
   * @param char Character to be evaluated.
   */
  private static isQuoteChar(char: string): boolean {
    return char === '"' || char === "'" || char === '`';
  }

  /**
   * Tidy parser results.
   *
   * @param results Parser results.
   */
  private static tidy(results: P_DDS[]): P_DDS {
    return results[0];
  }

  /**
   * Parser results getter. Will run nearley parser on string fed to this parser.
   */
  get results(): P_MAIN {
    let lineCount = 1;
    let statement = this.statements.shift();
    const results = [];

    /**
     * Since we separate the statements, if there is a parse error in a block among
     * several statements in a stream, the parser will throw the error with line
     * 0 counting from the beginning of the statement, not the stream. So we
     * need to catch and correct line count incrementally along the stream.
     *
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/20
     */
    try {
      while (statement) {
        this.parser.feed(statement);
        lineCount += (statement.match(/\r\n|\r|\n/g) || []).length;
        results.push(Parser.tidy(this.parser.results));
        statement = this.statements.shift();

        this.resetParser();
      }
    } catch (e) {
      /**
       * Apply line count correction.
       */
      if (e.message && isString(e.message)) {
        const matches = e.message.match(/^at line (\d+)/);
        if (matches && Array.isArray(matches) && matches.length > 1) {
          const errorLine = Number(matches[1]);
          const newCount = lineCount + errorLine - 1;
          e.message = e.message.replace(/\d+/, newCount);
        }
      }

      /**
       * Reset everything to not affect next feed.
       */
      this.resetParser();
      this.statements = [];
      this.remains = '';
      this.escaped = false;
      this.quoted = '';

      throw e;
    }

    /**
     * Reset remains to not affect next feed.
     */
    this.remains = '';
    this.escaped = false;
    this.quoted = '';

    return {
      id: 'MAIN',
      def: results,
    };
  }

  /**
   * Formats given parsed JSON to a compact format.
   * If no JSON is given, will use currently parsed SQL.
   *
   * @param json Parsed JSON format (optional).
   * @returns {any[]} Array of tables in compact JSON format.
   */
  toCompactJson(json?: P_MAIN): CompactJSONFormat[] {
    return this.compactFormatter(json ?? this.results);
  }

  /**
   * Formats parsed SQL to an array of JSON Schema documents,
   * where each item is the JSON Schema of a table. If no
   * tables are given, will use currently parsed SQL.
   *
   * @param options Options available to format as JSON Schema (optional).
   * @param tables Array of tables in compact JSON format (optional).
   */
  toJsonSchemaArray(
    options: JSONSchemaFormatOptions = {
      useRef: true,
    },
    tables?: CompactJSONFormat[],
  ): JSONSchema7[] {
    return this.jsonSchemaFormatter(tables ?? this.toCompactJson(), options);
  }
}
