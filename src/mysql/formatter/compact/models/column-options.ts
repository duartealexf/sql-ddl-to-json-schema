import { ColumnOptionsInterface, SerializableInterface, ClonableInterface } from "./typings";
import { O_COLUMN_DEFINITION } from "@mysql/compiled/typings";

import {
  isString,
  isDefined
} from '@shared/utils';

/**
 * Options of a table column.
 */
export class ColumnOptions implements ColumnOptionsInterface {
  unsigned?: boolean;
  zerofill?: boolean;
  charset?: string;
  collation?: string;
  nullable?: boolean;
  default?: string | number | boolean;
  autoincrement?: boolean;
  unique?: boolean;
  primary?: boolean;
  comment?: string;
  invisibleWithSystemVersioning?: boolean;
  invisibleWithoutSystemVersioning?: boolean;
  invisible?: boolean;
  format?: string;
  storage?: string;
  onUpdate?: string;

  /**
   * Creates column options instance from an array of definitions.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromArray(json: O_COLUMN_DEFINITION[]) {
    const columnOptions = new ColumnOptions();

    json.forEach(columnDefinition => {
      Object.assign(columnOptions, columnDefinition.def); // TODO: check, this should not assign extra properties to this instance.
    });

    if (columnOptions.collation) {
      columnOptions.collation = columnOptions.collation.toLowerCase();
    }

    if (columnOptions.charset) {
      columnOptions.charset = columnOptions.charset.toLowerCase();
    }

    if (columnOptions.storage) {
      columnOptions.storage = columnOptions.storage.toLowerCase();
    }

    if (columnOptions.format) {
      columnOptions.format = columnOptions.format.toLowerCase();
    }

    /**
     * If column is not 'NOT NULL', consider it 'NULL DEFAULT NULL'.
     */
    if (!utils.isDefined(columnOptions.nullable)) {
      columnOptions.nullable = true;
    }

    /**
     * If column has zerofill property, it is unsigned.
     * @see https://mariadb.com/kb/en/library/int/
     */
    if (columnOptions.zerofill) {
      columnOptions.unsigned = true;
    }

    /**
     * If column is primary key, then it is not nullable.
     */
    if (columnOptions.primary) {
      columnOptions.nullable = false;
    }

    return columnOptions;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): ColumnOptionsInterface {
    const json: ColumnOptionsInterface = {};

    if (utils.isDefined(this.unsigned)) { json.unsigned = this.unsigned; }
    if (utils.isDefined(this.zerofill)) { json.zerofill = this.zerofill; }
    if (utils.isDefined(this.charset)) { json.charset = this.charset; }
    if (utils.isDefined(this.collation)) { json.collation = this.collation; }
    if (utils.isDefined(this.nullable)) { json.nullable = this.nullable; }
    if (utils.isDefined(this.nullable)) { json.nullable = this.nullable; }
    if (utils.isDefined(this.default)) { json.default = this.default; }
    if (utils.isDefined(this.autoincrement)) { json.autoincrement = this.autoincrement; }
    if (utils.isDefined(this.unique)) { json.unique = this.unique; }
    if (utils.isDefined(this.primary)) { json.primary = this.primary; }
    if (utils.isDefined(this.invisible)) { json.invisible = this.invisible; }
    if (utils.isDefined(this.format)) { json.format = this.format; }
    if (utils.isDefined(this.storage)) { json.storage = this.storage; }
    if (utils.isDefined(this.comment)) { json.comment = this.comment; }
    if (utils.isDefined(this.onUpdate)) { json.onUpdate = this.onUpdate; }

    /**
     * Change "null" string to null default column value.
     */
    if (isString(json.default) && json.default.toLowerCase() === 'null') {
      json.default = null;
    }

    if (isDefined(this.invisibleWithSystemVersioning)) {
      json.invisibleWithSystemVersioning = this.invisibleWithSystemVersioning;
    }

    if (isDefined(this.invisibleWithoutSystemVersioning)) {
      json.invisibleWithoutSystemVersioning = this.invisibleWithoutSystemVersioning;
    }

    return json;
  }

  /**
   * Merge this option instance with another one.
   * Common properties of this instance are overwritten.
   *
   * @param options JSON format parsed from SQL.
   */
  mergeWith(options: ColumnOptions) {
    Object.getOwnPropertyNames(options)
      .forEach(k => {
        const value = options[k as keyof ColumnOptionsInterface];
        if (isDefined(value)) {
          Object.defineProperty(this, k, { value }); // TODO: check, this is changed but should work the same way.
        }
      });
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): ColumnOptions {
    const options = new ColumnOptions();

    Object.getOwnPropertyNames(this)
      .forEach(k => {
        const value = this[k as keyof ColumnOptionsInterface];
        if (isDefined(value)) {
          Object.defineProperty(options, k, { value }); // TODO: check, this is changed but should work the same way.
        }
      });

    return options;
  }
}
