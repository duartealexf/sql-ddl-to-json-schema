const nearley = require('nearley');
const grammar = require('./grammar');

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
   * Parser results getter.
   *
   * @returns {any[]} Parsed results.
   */
  get results() {
    const results = this.parser.results;
    return results[0];
  }
}

module.exports = Parser;
