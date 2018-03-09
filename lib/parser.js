const NearleyParser = require('nearley').Parser;
const NearleyGrammar = require('nearley').Grammar;

const mySqlGrammarRules = require('./mysql/parser/grammar');

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
  constructor(dialect) {
    if (!dialect || dialect === 'mysql' || dialect === 'mariadb') {
      this.compiledGrammar = NearleyGrammar.fromCompiled(mySqlGrammarRules);
    }
    else {
      throw new Error(`Unsupported dialect given to parser: '${dialect}. ` +
        `Please provide none to use default, 'mysql' or 'mariadb'`);
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
}

module.exports = Parser;
