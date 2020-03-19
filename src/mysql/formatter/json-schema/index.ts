import { JSONSchema7 } from 'json-schema';

import { JSONSchemaFormatter, TableInterface, JSONSchemaFormatOptions } from '../../../typings';
import { Database } from './models/database';

/**
 * Formats given array of tables in compact format to JSON Schema array
 *
 * @param json Compact JSON format (array of tables).
 * @param options Options available to format as JSON Schema.
 */
export const format: JSONSchemaFormatter = (
  json: TableInterface[],
  options: JSONSchemaFormatOptions,
): JSONSchema7[] => {
  const database = new Database();
  database.parseCompactJson(json);
  return database.getTables().map((t) => t.toJSON(options));
};
