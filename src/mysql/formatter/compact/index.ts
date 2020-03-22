import { P_MAIN, TableInterface, CompactFormatter } from '../../../typings';

import { Database } from './models/database';

/**
 * Formats given JSON parsed from SQL to a compact
 * format containing array of tables.
 *
 * @param json Parsed JSON format.
 */
export const format: CompactFormatter = (json: P_MAIN): TableInterface[] => {
  if (json.id === 'MAIN') {
    const database = new Database();
    database.parseDdsCollection(json.def);
    return database.getTables().map((t) => t.toJSON());
  }

  throw new TypeError(
    'Invalid JSON format provided for CompactFormatter. ' +
      'Please provide JSON from root element, containing { id: MAIN }.',
  );
};
