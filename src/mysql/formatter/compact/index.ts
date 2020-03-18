import { P_MAIN } from '@typings/parsed';
import { TableInterface } from '@typings/compact';

import { Database } from './models/database';

/**
 * Formatter for parsed JSON. Provides a compact JSON
 * format with array of tables parsed from SQL.
 */
export class CompactFormatter {
  /**
   * Formats given JSON parsed from SQL to a compact
   * format containing array of tables.
   *
   * @param json Parsed JSON format.
   */
  format(json: P_MAIN): TableInterface[] {
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
