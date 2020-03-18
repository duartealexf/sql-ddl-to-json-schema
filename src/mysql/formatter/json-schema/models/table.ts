import { JSONSchema7 as OriginalJSONSchema7 } from 'json-schema';

import { JSONSchemaFormatOptions } from '@typings/json-schema';
import { TableInterface } from '@typings/compact';
import { Tuple } from '@typings/utils';
import { isDefined } from '@shared/utils';

import { Column } from './column';

type JSONSchema7 = OriginalJSONSchema7 & {
  type: string;
  required: string[];
  definitions: NonNullable<OriginalJSONSchema7['definitions']>;
  properties: NonNullable<OriginalJSONSchema7['properties']>;
};

/**
 * Class to represent a table as parsed from compact format.
 */
export class Table {
  /**
   * Table columns.
   */
  columns: Column[] = [];

  /**
   * Table name.
   */
  name!: string;

  /**
   * Table comment.
   */
  comment?: string;
  /**
   * Create Table instance from compact JSON format.
   *
   * @param json Table in compact JSON format.
   */
  static fromCompactJson(json: TableInterface): Table {
    const table = new Table();

    table.name = json.name;

    if (isDefined(json.columns)) {
      table.columns = json.columns.map((c) => Column.fromCompactJson(c));
    }

    if (isDefined(json.primaryKey)) {
      /**
       * Set property in column(s) that is/are primary key(s).
       */
      json.primaryKey.columns
        .map((c) => c.column)
        .map((name) => table.columns.find((c) => c.name === name))
        .filter(isDefined)
        .forEach((column) => {
          column.isPrimaryKey = true;
        });
    }

    const options = json.options;

    if (options) {
      if (isDefined(options.comment)) {
        table.comment = options.comment;
      }
    }

    return table;
  }

  /**
   * JSON casting of this object calls this method.
   * @param options Options available to format as JSON Schema.
   */
  toJSON(options: JSONSchemaFormatOptions): JSONSchema7 {
    const json: JSONSchema7 = {
      $schema: 'http://json-schema.org/draft-07/schema',
      $comment: `JSON Schema for ${this.name} table`,
      $id: this.name,
      title: this.name,
      type: 'object',
      required: [],
      definitions: {},
      properties: {},
    };

    if (isDefined(this.comment)) {
      json.description = this.comment;
    }

    this.columns.forEach((c) => {
      const column = c.toJSON();
      const name = c.name;
      const definitions: JSONSchema7['definitions'] = {};

      json.properties[name] = {
        $ref: `#/definitions/${name}`,
      };

      Object.values(column).forEach(([key, value]: Tuple<OriginalJSONSchema7>) => {
        Object.defineProperty(definitions, key, { value });
      });

      json.definitions[name] = definitions;

      if (c.isNullable === false) {
        (json.required as string[]).push(name);
      }
    });

    /**
     * Option to not use $ref, and have properties flattened out to 'properties' node.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/36
     */
    if (options.useRef === false) {
      json.properties = json.definitions;
      delete json.definitions;
    }

    return json;
  }
}
