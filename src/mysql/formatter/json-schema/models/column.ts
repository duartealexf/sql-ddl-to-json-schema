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

      if (options.default === null || (isString(options.default) && options.default.length)) {
        column.default = options.default;
      }

      if (isString(options.comment) && options.comment.length) {
        column.comment = options.comment;
      }

      column.isNullable = options.nullable;
    }

    return column;
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
