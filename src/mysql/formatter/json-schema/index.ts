import { JSONSchema7 } from 'json-schema';

import { JSONSchemaFormatOptions } from '@shared/typings';

import { TableInterface } from '../compact/models/typings';
import { Database } from './models/database';

/**
 * Formatter for parsed JSON. Provides JSON
 * Schema output in files or string.
 */
export class JsonSchemaFormatter {
  /**
   * Formats given array of tables in compact format to JSON Schema array
   *
   * @param json Compact JSON format (array of tables).
   * @param options Options available to format as JSON Schema.
   */
  static format(json: TableInterface[], options: JSONSchemaFormatOptions): JSONSchema7[] {
    const database = new Database();
    database.parseCompactJson(json);
    return database.getTables().map((t) => t.toJSON(options));
  }
}
