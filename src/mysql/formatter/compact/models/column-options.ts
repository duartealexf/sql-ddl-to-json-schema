import { O_COLUMN_DEFINITION, ColumnOptionsInterface } from '../../../../typings';
import { isString, isDefined, setProperty } from '../../../../shared/utils';
import { ColumnOptionsModelInterface } from './typings';

/**
 * Options of a table column.
 */
export class ColumnOptions implements ColumnOptionsModelInterface {
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
  static fromArray(json: O_COLUMN_DEFINITION[]): ColumnOptions {
    const columnOptions = new ColumnOptions();

    json.forEach((columnDefinition) => {
      Object.assign(columnOptions, columnDefinition.def);
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
    if (!isDefined(columnOptions.nullable)) {
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

    if (isDefined(this.unsigned)) {
      json.unsigned = this.unsigned;
    }
    if (isDefined(this.zerofill)) {
      json.zerofill = this.zerofill;
    }
    if (isDefined(this.charset)) {
      json.charset = this.charset;
    }
    if (isDefined(this.collation)) {
      json.collation = this.collation;
    }
    if (isDefined(this.nullable)) {
      json.nullable = this.nullable;
    }
    if (isDefined(this.nullable)) {
      json.nullable = this.nullable;
    }
    if (isDefined(this.default)) {
      json.default = this.default;
    }
    if (isDefined(this.autoincrement)) {
      json.autoincrement = this.autoincrement;
    }
    if (isDefined(this.unique)) {
      json.unique = this.unique;
    }
    if (isDefined(this.primary)) {
      json.primary = this.primary;
    }
    if (isDefined(this.invisible)) {
      json.invisible = this.invisible;
    }
    if (isDefined(this.format)) {
      json.format = this.format;
    }
    if (isDefined(this.storage)) {
      json.storage = this.storage;
    }
    if (isDefined(this.comment)) {
      json.comment = this.comment;
    }
    if (isDefined(this.onUpdate)) {
      json.onUpdate = this.onUpdate;
    }

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
  mergeWith(options: ColumnOptions): void {
    Object.getOwnPropertyNames(options).forEach((k) => {
      const value = options[k as keyof ColumnOptionsInterface];
      if (isDefined(value)) {
        setProperty(this, k, value);
      }
    });
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): ColumnOptions {
    const options = new ColumnOptions();

    Object.getOwnPropertyNames(this).forEach((k) => {
      const value = this[k as keyof ColumnOptionsInterface];
      if (isDefined(value)) {
        setProperty(options, k, value);
      }
    });

    return options;
  }
}
