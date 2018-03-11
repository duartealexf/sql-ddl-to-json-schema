/* eslint no-unused-vars: 0 */
const Table = require('./models/table');
const Main = require('./models/main');

/**
 * Formatter for parsed JSON. Provides a compact JSON
 * format with array of tables parsed from SQL.
 */
class CompactFormatter {

  /**
   * Formats given JSON parsed from SQL to a compact
   * format containing array of tables.
   *
   * @param {any} json Parsed JSON format.
   * @returns {any[]} Compact format.
   */
  static format(json) {

    if (json.id !== 'MAIN') {
      throw new TypeError('Invalid JSON format provided for CompactFormatter. ' +
        'Please provide JSON from root element, containing { id: MAIN }.'
      );
    }

    const main = new Main();
    main.parseDdsCollection(json.def);
    return main.getTables().map(t => t.toJSON());
  }
}

module.exports = CompactFormatter;
