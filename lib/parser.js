const NearleyParser = require('nearley').Parser;
const NearleyGrammar = require('nearley').Grammar;

// const mySqlGrammarRules = require('./mysql/parser/grammar');
// const mySqlCompactFormatter = require('./mysql/formatter/compact');
// const mySqlJsonSchemaFormatter = require('./mysql/formatter/json-schema');

const postgresGrammarRules = require('./postgres/parser/grammar');
const postgresCompactFormatter = require('./postgres/formatter/compact');
const postgresJsonSchemaFormatter = require('./postgres/formatter/json-schema');

const utils = require('./shared/utils');

const fs = require('fs');
const { join } = require('path');

/**
 * Main Parser class, wraps nearley parser main methods.
 */
class Parser {

  /**
   * Parser constructor.
   * Default dialect is 'mysql'.
   *
   * @param {string} dialect SQL dialect ('mysql' or 'mariadb' currently supported).
   */
  // constructor(dialect = 'mysql') {
  constructor(dialect = 'postgres') {
    // if (!dialect || dialect === 'mysql' || dialect === 'mariadb') {
    //   this.compiledGrammar = NearleyGrammar.fromCompiled(mySqlGrammarRules);
    //   this.compactFormatter = mySqlCompactFormatter;
    //   this.jsonSchemaFormatter = mySqlJsonSchemaFormatter;
    // }
    // else 
    if (!dialect || dialect === 'postgres') {
      this.compiledGrammar = NearleyGrammar.fromCompiled(postgresGrammarRules);
      this.compactFormatter = postgresCompactFormatter;
      this.jsonSchemaFormatter = postgresJsonSchemaFormatter;
    }
    else {
      throw new TypeError(`Unsupported SQL dialect given to parser: '${dialect}. ` +
        `Please provide 'mysql', 'mariadb' or none to use default.`);
    }

    this.resetParser();

    /**
     * Parsed statements.
     * @type {string[]}
     */
    this.statements = [];

    /**
     * Remains of string feed, after last parsed statement.
     */
    this.remains = '';

    /**
     * Whether preparser is currently escaped.
     */
    this.escaped = false;

    /**
     * Current quote char of preparser.
     */
    this.quoted = '';
  }

  /**
   * Feed chunk of string into parser.
   *
   * @param {string} chunk Chunk of string to be parsed.
   * @returns {Parser} Parser class.
   */
  feed(chunk) {
    let i, char, parsed = '';
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
   *
   * @returns {void}
   */
  resetParser() {
    this.parser = new NearleyParser(this.compiledGrammar);
  }

  /**
   * Checks whether character is a quotation character.
   *
   * @param {string} char Character to be evaluated.
   * @returns {boolean} Whether char is quotation char.
   */
  isQuoteChar(char) {
    return char === '"' || char === "'" || char === '`';
  }

  /**
   * Tidy parser results.
   *
   * @param {any} results Parser results.
   * @returns {any} Tidy results.
   */
  tidy(results) {
    return results[0];
  }

  /**
   * Parser results getter. Will run nearley parser on string fed to this parser.
   *
   * @returns {any} Parsed results.
   */
  get results() {
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
      if (e.message && utils.isString(e.message)) {
        const matches = e.message.match(/^invalid syntax at line (\d+)/);
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
      id: "MAIN",
      def: results
    };
  }

  /**
   * Formats given parsed JSON to a compact format.
   * If no JSON is given, will use currently parsed SQL.
   *
   * @param {any} json Parsed JSON format (optional).
   * @returns {any[]} Array of tables in compact JSON format.
   */
  toCompactJson(json = null) {
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
   * @param {any[]} tables Array of tables in compact JSON format (optional).
   * @returns {any[]} JSON Schema documents array.
   */
  toJsonSchemaArray(tables = null) {
    if (!tables) {
      tables = this.toCompactJson();
    }

    return this.jsonSchemaFormatter.format(tables);
  }

  /**
   * Output JSON Schema files (one for each table) in given output directory for the
   * parsed SQL. If no JSON Schemas array is given, will use currently parsed SQL.
   *
   * @param {string} outputDir Output directory.
   * @param {JsonSchemaOutputOptions} options Options object for JSON Schema output to files (optional).
   * @param {any[]} jsonSchemas JSON Schema documents array (optional).
   * @returns {Promise<string[]>} Resolved promise with output file paths.
   */
  toJsonSchemaFiles(outputDir, options = {}, jsonSchemas = null) {
    if (!outputDir) {
      throw new Error('Please provide output directory for JSON Schema files');
    }

    const defaultOptions = new JsonSchemaOutputOptions();

    if (!jsonSchemas) {
      jsonSchemas = this.toJsonSchemaArray();
    }

    Object.getOwnPropertyNames(defaultOptions)
      .filter(k => typeof options[k] === 'undefined')
      .map(k => [k, defaultOptions[k]])
      .forEach(([k, v]) => { options[k] = v; });

    return Promise.all(
      jsonSchemas.map(schema => {
        return new Promise(resolve => {
          if (!schema.$id) {
            throw new Error('No root $id found in schema. It should contain the table name. ' +
              'If you have modified the JSON Schema, please keep the $id, as it will be the file name.');
          }
          const filename = schema.$id;
          const filepath = join(outputDir, filename + options.extension);

          fs.writeFile(filepath, JSON.stringify(schema, null, options.indent), err => {
            if (err) {
              throw new Error(`Error when trying to write to file ${filepath}: ${JSON.stringify(err, null, 2)}`);
            }
            resolve(filepath);
          });
        });
      })
    );
  }
}

/**
 * Options for JSON Schema output to files.
 */
class JsonSchemaOutputOptions {

  /**
   * Options constructor.
   */
  constructor() {
    /**
     * Indent size for output files.
     */
    this.indent = 2;

    /**
     * Extension to add to output files.
     */
    this.extension = '.json';
  }
}

module.exports = Parser;
