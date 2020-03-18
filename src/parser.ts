import { Parser as NearleyParser, Grammar as NearleyGrammar } from 'nearley';

import { Grammar as MySQLGrammarRules } from '@mysql/compiled';
import { CompactFormatter as MySQLCompactFormatter } from '@mysql/formatter/compact';
import { JSONSchemaFormatter as MySQLJSONSchemaFormatter } from './mysql/formatter/json-schema';

import fs from 'fs';
import { join } from 'path';
import { isString } from '@shared/utils';
import { CompactJSONFormat } from '@typings/compact';
import { JSONSchema7 } from 'json-schema';
import { JSONSchemaFormatOptions, JSONSchemaFileOptions } from '@typings/json-schema';
import { P_MAIN, P_DDS } from '@typings/parsed';

/**
 * Main Parser class, wraps nearley parser main methods.
 */
export class Parser {
  private compiledGrammar!: NearleyGrammar;
  private parser!: NearleyParser;

  private jsonSchemaFormatter!: MySQLJSONSchemaFormatter;
  private compactFormatter!: MySQLCompactFormatter;

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
      this.compactFormatter = new MySQLCompactFormatter();
      this.jsonSchemaFormatter = new MySQLJSONSchemaFormatter();
    } else {
      throw new TypeError(
        `Unsupported SQL dialect given to parser: '${dialect}. ` +
          `Please provide 'mysql', 'mariadb' or none to use default.`,
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
    let i,
      char,
      parsed = '';
    let lastStatementIndex = 0;

    for (i = 0; i < chunk.length; i++) {
      char = chunk[i];
      parsed += char;

      if (char === '\\') {
        this.escaped = !this.escaped;
      } else {
        if (!this.escaped && this.isQuoteChar(char)) {
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
  resetParser() {
    this.parser = new NearleyParser(this.compiledGrammar);
  }

  /**
   * Checks whether character is a quotation character.
   *
   * @param char Character to be evaluated.
   */
  private isQuoteChar(char: string): boolean {
    return char === '"' || char === "'" || char === '`';
  }

  /**
   * Tidy parser results.
   *
   * @param results Parser results.
   */
  private tidy(results: P_DDS[]): P_DDS {
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
        results.push(this.tidy(this.parser.results));
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
    if (!json) {
      json = this.results;
    }

    return this.compactFormatter.format(json);
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
    if (!tables) {
      tables = this.toCompactJson();
    }

    return this.jsonSchemaFormatter.format(tables, options);
  }

  /**
   * Output JSON Schema files (one for each table) in given output directory for the
   * parsed SQL. If no JSON Schemas array is given, will use currently parsed SQL.
   * Only available in NodeJS environments.
   *
   * @param outputDir Output directory.
   * @param options Options object for JSON Schema output to files (optional).
   * @param jsonSchemas JSON Schema documents array (optional).
   */
  async toJsonSchemaFiles(
    outputDir: string,
    options: JSONSchemaFileOptions = {
      useRef: true,
      extension: '.json',
      indent: 2,
    },
    jsonSchemas?: JSONSchema7[],
  ): Promise<string[]> {
    if (!outputDir) {
      throw new Error('Please provide output directory for JSON Schema files');
    }

    if (!jsonSchemas) {
      jsonSchemas = this.toJsonSchemaArray({
        useRef: options.useRef,
      });
    }

    const filepaths = await Promise.all<string>(
      jsonSchemas.map(async (schema) => {
        if (!schema.$id) {
          throw new Error(
            'No root $id found in schema. It should contain the table name. ' +
              'If you have modified the JSON Schema, please keep the $id, as it will be the file name.',
          );
        }

        const filename = schema.$id;
        const filepath = join(outputDir, filename + options.extension);

        const path = await new Promise<string>((resolve) => {
          fs.writeFile(filepath, JSON.stringify(schema, null, options.indent), (err) => {
            if (err) {
              throw new Error(
                `Error when trying to write to file ${filepath}: ${JSON.stringify(err, null, 2)}`,
              );
            }
            resolve(filepath);
          });
        });

        return path;
      }),
    );

    return filepaths;
  }
}
