import { ColumnInterface as CompactFormatColumnInterface } from '@mysql/formatter/compact/models/typings';

import { Datatype } from './datatype';

import { isString, isDefined, isNumber } from '@shared/utils';
import { ColumnInterface } from './typings';

/**
 * Table column.
 */
export class Column implements ColumnInterface {
  name?: string;
  datatype?: Datatype;
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
  toJSON(): ColumnInterface {
    const json: ColumnInterface = {};
    const type = this.datatype.toJSON();

    /**
     * Special treatment for primary keys.
     */
    if (this.isPrimaryKey === true) {
      json.$comment = 'primary key';
      type.minimum = 1;
    }

    if (isDefined(this.comment)) {
      json.description = this.comment;
    }

    Object.getOwnPropertyNames(type)
      .map((k) => [k, type[k]])
      .filter(([, v]) => {
        return isNumber(v) ? isFinite(v) : true;
      })
      .forEach(([k, v]) => {
        json[k] = v;
      });

    if (typeof this.default !== 'undefined') {
      json.default = this.default;
    }

    return json;
  }
}
