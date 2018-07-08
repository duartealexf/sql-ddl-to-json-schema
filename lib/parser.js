const NearleyParser = require('nearley').Parser;
const NearleyGrammar = require('nearley').Grammar;

const mySqlGrammarRules = require('./mysql/parser/grammar');
const mySqlCompactFormatter = require('./mysql/formatter/compact');
const mySqlJsonSchemaFormatter = require('./mysql/formatter/json-schema');

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
  constructor(dialect = 'mysql') {
    if (!dialect || dialect === 'mysql' || dialect === 'mariadb') {
      this.compiledGrammar = NearleyGrammar.fromCompiled(mySqlGrammarRules);
      this.compactFormatter = mySqlCompactFormatter;
      this.jsonSchemaFormatter = mySqlJsonSchemaFormatter;
    }
    else {
      throw new TypeError(`Unsupported SQL dialect given to parser: '${dialect}. ` +
        `Please provide 'mysql', 'mariadb' or none to use default.`);
    }

    this.resetParser();

    this.statements = [];
    this.remains = '';
    this.escaped = false;
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
        if (!this.escaped) {
          this.escaped = true;
        }
      }
      else if (this.isQuoteChar(char)) {
        if (this.escaped) {
          this.escaped = false;
        }
        else if (this.quoted) {
          if (this.quoted === char) {
            this.quoted = '';
          }
        }
        else {
          this.quoted = char;
        }
      }
      else if (char === ';' && !this.quoted) {
        this.statements.push(this.remains + parsed.substr(lastStatementIndex, i + 1));
        this.remains = '';
        lastStatementIndex = i + 1;
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
   * Parser results getter.
   *
   * @returns {any} Parsed results.
   */
  get results() {
    let statement = this.statements.shift();
    const results = [];

    while (statement) {
      this.parser.feed(statement);
      results.push(this.tidy(this.parser.results));
      statement = this.statements.shift();

      this.resetParser();
    }

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
