import { JSONSchema7 } from 'json-schema';
import { ColumnInterface as CompactFormatColumnInterface } from '../../../../typings';
import { isString, isDefined, isNumber, setProperty } from '../../../../shared/utils';

import { Datatype } from './datatype';

/**
 * Table column.
 */
export class Column {
  name!: string;

  datatype!: Datatype;

  isNullable?: boolean;

  isPrimaryKey?: boolean;

  comment?: string;

  default?: boolean | string | number | null;

  /**
   * Create Column instance from compact JSON format.
   *
   * @param json Column in compact JSON format.
   */
  static fromCompactJson(json: CompactFormatColumnInterface): Column {
    const column = new Column();

    column.datatype = Datatype.fromCompactJson(json.type);
    column.name = json.name;

    const options = json.options;

    if (options) {
      if (options.unsigned) {
        column.datatype.isUnsigned = options.unsigned;
      }

      if (options.default === null || isString(options.default) || isNumber(options.default)) {
        column.default = options.default;

        if (column.datatype.datatype === 'boolean') {
          column.default = Column.toBooleanDefault(options.default);
        }
      }

      if (isString(options.comment) && options.comment.length) {
        column.comment = options.comment;
      }

      column.isNullable = options.nullable;
    }

    return column;
  }

  /**
   * Map a BOOLEAN column default to a JSON boolean. MySQL stores BOOLEAN as
   * TINYINT(1), so TRUE/FALSE and 1/0 are equivalent. Other values are kept.
   *
   * @param value Default value from compact JSON format.
   */
  static toBooleanDefault(value: string | number | null): boolean | string | number | null {
    if (isString(value)) {
      const upper = value.toUpperCase();

      if (upper === 'TRUE') {
        return true;
      }

      if (upper === 'FALSE') {
        return false;
      }
    }

    if (value === 1) {
      return true;
    }

    if (value === 0) {
      return false;
    }

    return value;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): JSONSchema7 {
    const json: JSONSchema7 = {};
    const type = this.datatype.toJSON();

    /**
     * Special treatment for primary keys.
     */
    if (this.isPrimaryKey === true) {
      json.$comment = 'primary key';

      if (type.type === 'integer' || type.type === 'number') {
        type.minimum = 1;
      }
    }

    if (isDefined(this.comment)) {
      json.description = this.comment;
    }

    Object.getOwnPropertyNames(type).forEach((key: string) => {
      const value = type[key as keyof JSONSchema7];
      const number = isNumber(value);

      if ((number && Number.isFinite(value as never)) || !number) {
        setProperty(json, key, value);
      }
    });

    if (typeof this.default !== 'undefined') {
      json.default = this.default;
    }

    if (this.datatype.datatype === 'uuid') {
      delete json.default;
    }

    return json;
  }
}
