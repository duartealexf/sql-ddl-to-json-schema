const nearley = require('nearley');
const grammar = require('./compiled/grammar');

/**
 * Main Parser class, wraps nearley parser main methods.
 */
class Parser {

  /**
   * Parser constructor.
   */
  constructor() {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  /**
   * Feed chunk of string into parser.
   *
   * @param {string} chunk Chunk of string to be parsed.
   * @returns {Parser} Parser class.
   */
  feed(chunk) {
    this.parser.feed(chunk);
    return this;
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
    const results = this.parser.results;
    return this.tidy(results);
  }
}

module.exports = Parser;
