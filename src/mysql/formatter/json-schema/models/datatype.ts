import { DatatypeInterface } from '@mysql/formatter/compact/models/typings';
import { isDefined } from '@shared/utils';

import { JSONSchema7TypeName, JSONSchema7 } from 'json-schema';

/**
 * Data type.
 */
export class Datatype {
  /**
   * Datatype name.
   */
  datatype?: string;

  /**
   * Width (in bytes) for integer types.
   */
  width?: number;

  /**
   * Length of year type or length of a number
   * including decimals (for numeric types).
   */
  digits?: number;

  /**
   * Length of decimal portion of a number (for numeric types).
   */
  decimals?: number;

  /**
   * Length property for bit, textual and blob types.
   */
  length?: number;

  /**
   * Fractional length for date types.
   */
  fractional?: number;

  /**
   * Possible values for enum and set.
   */
  values?: string[];

  /**
   * Whether datatype is unsigned.
   */
  isUnsigned?: boolean;

  /**
   * Create Datatype instance from compact JSON format.
   *
   * @param json Datatype in compact JSON format.
   */
  static fromCompactJson(json: DatatypeInterface): Datatype {
    const datatype = new Datatype();

    datatype.datatype = json.datatype;

    if (isDefined(json.decimals)) {
      datatype.decimals = json.decimals;
    }
    if (isDefined(json.digits)) {
      datatype.digits = json.digits;
    }
    if (isDefined(json.fractional)) {
      datatype.fractional = json.fractional;
    }
    if (isDefined(json.length)) {
      datatype.length = json.length;
    }
    if (isDefined(json.values)) {
      datatype.values = json.values;
    }
    if (isDefined(json.width)) {
      datatype.width = json.width;
    }

    return datatype;
  }

  /**
   * Get standardized name for datatype, according to parsed compact JSON type.
   *
   * @param type Datatype parsed from compact JSON format.
   */
  static filterDatatype(type: string): JSONSchema7TypeName {
    /**
     * Filters: int, integer, tinyint, smallint, mediumint, bigint
     */
    if (type === 'int') {
      return 'integer';
    }

    /**
     * Filters: decimal, numeric, float, double
     */
    if (type === 'decimal') {
      return 'number';
    }
    if (type === 'float') {
      return 'number';
    }
    if (type === 'double') {
      return 'number';
    }

    /**
     * Filters: bool, boolean
     */
    if (type === 'boolean') {
      return 'boolean';
    }

    /**
     * Everything else is a string.
     */
    return 'string';
  }

  /**
   * JSON casting of this object calls this method.
   * Perform some special formattings according to the datatype.
   *
   * No special operations are needed with datatypes:
   * - double (rules depends on hardware)
   * - bit (string with no limitations)
   * - boolean (simple boolean)
   * - timestamp (simple integer)
   * - blob (lengths are ignored)
   * - geometry (too complex for JSON Schema)
   * - point (too complex for JSON Schema)
   * - linestring (too complex for JSON Schema)
   * - polygon (too complex for JSON Schema)
   * - multipoint (too complex for JSON Schema)
   * - multilinestring (too complex for JSON Schema)
   * - multipolygon (too complex for JSON Schema)
   * - geometrycollection (too complex for JSON Schema)
   * - json (too complex for JSON Schema)
   */
  toJSON(): JSONSchema7 {
    const json: JSONSchema7 = {
      type: Datatype.filterDatatype(this.datatype as string),
    };

    if (this.datatype === 'int') {
      /**
       * Set minimum and maximum for int.
       */
      const width = Math.pow(2, 8 * (this.width as number));

      if (this.isUnsigned) {
        json.minimum = 0;
        json.maximum = width;
      } else {
        json.minimum = 0 - width / 2;
        json.maximum = 0 - json.minimum - 1;
      }
    } else if (this.datatype === 'decimal' || this.datatype === 'float') {
      /**
       * Set minimum and maximum for decimal and float.
       *
       * According to mySQL and MariaDB documentation, minimum and maximum
       * of double datatype depend on hardware so they are not added here.
       */
      json.maximum = Number(
        '9'.repeat((this.digits as number) - (this.decimals as number)) +
          '.' +
          '9'.repeat(this.decimals as number),
      );

      if (this.isUnsigned) {
        json.minimum = 0;
      } else {
        json.minimum = 0 - json.maximum;
      }
    } else if (this.datatype === 'date') {
      /**
       * Use JSON Schema date format.
       */
      json.format = 'date';
    } else if (this.datatype === 'time') {
      /**
       * Use JSON Schema time format.
       */
      json.format = 'time';
    } else if (this.datatype === 'datetime') {
      /**
       * Use JSON Schema date-time format.
       */
      json.format = 'date-time';
    } else if (this.datatype === 'year') {
      /**
       * Validate according to number of digits.
       */
      json.pattern = `\\d{1,${this.digits}}`;
    } else if (
      /**
       * Set maxLength to length of the text.
       */
      this.datatype === 'char' ||
      this.datatype === 'binary' ||
      this.datatype === 'varchar' ||
      this.datatype === 'varbinary' ||
      this.datatype === 'text'
    ) {
      json.maxLength = this.length;
    } else if (this.datatype === 'enum') {
      /**
       * Use enum values validation.
       */
      json.enum = this.values;
    } else if (this.datatype === 'set') {
      /**
       * Use pattern validation for set datatype.
       */
      const options = (this.values as string[]).join('|');
      json.pattern = `^(${options})(,(${options}))*$`;
    }

    return json;
  }
}
