/* eslint no-unused-vars: 0 */
const Table = require('./models/table');
const Database = require('./models/database');

/**
 * Formatter for parsed JSON. Provides JSON
 * Schema output in files or string.
 */
class JsonSchemaFormatter {

  /**
   * Formats given array of tables in compact format to
   * JSON Schema array
   *
   * @param {any[]} json Compact JSON format (array of tables).
   * @returns {any[]} JSON Schema array.
   */
  static format(json) {
    const database = new Database();
    database.parseCompactJson(json);
    return database.getTables().map(t => t.toJSON());
  }
}

module.exports = JsonSchemaFormatter;
