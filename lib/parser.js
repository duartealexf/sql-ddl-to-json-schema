const NearleyParser = require('nearley').Parser;
const NearleyGrammar = require('nearley').Grammar;

const mySqlGrammarRules = require('./mysql/parser/grammar');
const mySqlCompactFormatter = require('./mysql/formatter/compact');
const mySqlJsonSchemaFormatter = require('./mysql/formatter/json-schema');

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
   * Formats parsed SQL to a compact format
   * JSON containing array of tables.
   *
   * @returns {any[]} Array of tables.
   */
  toCompactJson() {
    return this.compactFormatter.format(this.results);
  }

  /**
   * Formats parsed SQL to an array of JSON Schema documents,
   * where each item is the JSON Schema of a table.
   *
   * @returns {any[]} JSON Schema documents array.
   */
  toJsonSchemaArray() {
    const tables = this.toCompactJson();
    return this.jsonSchemaFormatter.format(tables);
  }

  /**
   * Output JSON Schema files (one for each table) in
   * given output directory for the parsed SQL.
   *
   * @param {string} outputDir Output directory.
   * @returns {Promise<string[]>} Resolved promise with output file paths.
   */
  toJsonSchemaFiles(outputDir) {
    return new Promise(resolve => {
      if (!outputDir) {
        throw new Error('Please provide output directory for JSON Schema files');
      }

      const schemas = this.toJsonSchemaArray();
      resolve(schemas);
    });

  }

}

module.exports = Parser;
