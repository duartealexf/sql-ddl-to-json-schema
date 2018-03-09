const MAIN = require('./functions/main').MAIN;

/**
 * Formatter for parsed JSON. Provides a compact JSON
 * format with array of tables parsed from DDL.
 */
class CompactFormatter {

  /**
   * Formats given parsed JSON to a compact format.
   *
   * @param {any} parsedJSON Parsed JSON format.
   * @returns {any} Compact format.
   */
  static format(parsedJSON) {
    return MAIN(parsedJSON.def);
  }
}

module.exports = CompactFormatter;
