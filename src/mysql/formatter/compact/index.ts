import { Database } from './models/database';
import { P_MAIN } from '@mysql/compiled/typings';
import { TableInterface } from './models/typings';

/**
 * Formatter for parsed JSON. Provides a compact JSON
 * format with array of tables parsed from SQL.
 */
class CompactFormatter {
  /**
   * Formats given JSON parsed from SQL to a compact
   * format containing array of tables.
   *
   * @param json Parsed JSON format.
   */
  static format(json: P_MAIN): TableInterface[] {
    if (json.id !== 'MAIN') {
      throw new TypeError(
        'Invalid JSON format provided for CompactFormatter. ' +
          'Please provide JSON from root element, containing { id: MAIN }.',
      );
    }

    const database = new Database();
    database.parseDdsCollection(json.def);
    return database.getTables().map((t) => t.toJSON());
  }
}

module.exports = CompactFormatter;
