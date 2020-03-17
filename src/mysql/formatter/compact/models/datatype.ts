import { O_DATATYPE } from '@mysql/compiled/typings';
import { isDefined } from '@shared/utils';

import {
  DatatypeInterface,
  DatatypeModelInterface,
} from './typings';

/**
 * Data type.
 */
export class Datatype implements DatatypeModelInterface {
  datatype!: string;
  width?: number;
  digits?: number;
  decimals?: number;
  length?: number;
  fractional?: number;
  values?: string[];

  /**
   * Creates a datatype from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_DATATYPE): Datatype {
    if (json.id !== 'O_DATATYPE') {
      throw new TypeError(`Unknown json id to build datatype from: ${json.id}`);
    }

    const datatype = new Datatype();

    Object.getOwnPropertyNames(json.def.def).forEach((k) => {
      Object.assign(datatype, json.def.def); // TODO: check, this should still work.
    });

    datatype.datatype = Datatype.filterDatatype(datatype.datatype);

    return datatype;
  }

  /**
   * Get standardized name for datatype, according to parsed JSON term.
   *
   * @param term Datatype term parsed JSON format.
   */
  static filterDatatype(term: string): string {
    term = term.toLowerCase();
    if (term === 'integer') {
      return 'int';
    }
    if (term === 'tinyint') {
      return 'int';
    }
    if (term === 'smallint') {
      return 'int';
    }
    if (term === 'mediumint') {
      return 'int';
    }
    if (term === 'bigint') {
      return 'int';
    }
    if (term === 'numeric') {
      return 'decimal';
    }
    if (term === 'bool') {
      return 'boolean';
    }
    if (term === 'tinyblob') {
      return 'blob';
    }
    if (term === 'mediumblob') {
      return 'blob';
    }
    if (term === 'longblob') {
      return 'blob';
    }
    if (term === 'tinytext') {
      return 'text';
    }
    if (term === 'mediumtext') {
      return 'text';
    }
    if (term === 'longtext') {
      return 'text';
    }
    if (term === 'national char') {
      return 'char';
    }
    if (term === 'character') {
      return 'char';
    }
    if (term === 'nchar') {
      return 'char';
    }
    return term;
  }

  /**
   * Get length that is indexable by this datatype.
   * @returns Indexable length.
   */
  getMaxIndexableSize(): number | undefined {
    /**
     * Non-indexable datatypes.
     */
    if (
      [
        'int',
        'decimal',
        'float',
        'double',
        'bit',
        'boolean',
        'date',
        'time',
        'datetime',
        'timestamp',
        'year',
        'json',
      ].includes(this.datatype)
    ) {
      return;
    }

    /**
     * Indexable, but dynamic length, user-defined only.
     */
    if (
      [
        'geometry',
        'point',
        'linestring',
        'polygon',
        'multipoint',
        'multilinestring',
        'multipolygon',
        'geometrycollection',
      ].includes(this.datatype)
    ) {
      return;
    }

    /**
     * Indexable datatypes.
     */
    if (['blob', 'text', 'char', 'binary', 'varchar', 'varbinary'].includes(this.datatype)) {
      return this.length as number;
    }

    /**
     * Fallback, unknown or non-mapped datatype
     * (actually shouldn't fall here).
     */
    return;
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): DatatypeInterface {
    const json: DatatypeInterface = {
      datatype: this.datatype,
    };

    if (isDefined(this.width)) {
      json.width = this.width;
    }
    if (isDefined(this.digits)) {
      json.digits = this.digits;
    }
    if (isDefined(this.decimals)) {
      json.decimals = this.decimals;
    }
    if (isDefined(this.length)) {
      json.length = this.length;
    }
    if (isDefined(this.fractional)) {
      json.fractional = this.fractional;
    }
    if (isDefined(this.values)) {
      json.values = this.values;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): Datatype {
    const datatype = new Datatype();

    if (isDefined(this.width)) {
      datatype.width = this.width;
    }
    if (isDefined(this.digits)) {
      datatype.digits = this.digits;
    }
    if (isDefined(this.decimals)) {
      datatype.decimals = this.decimals;
    }
    if (isDefined(this.length)) {
      datatype.length = this.length;
    }
    if (isDefined(this.fractional)) {
      datatype.fractional = this.fractional;
    }
    if (isDefined(this.values)) {
      datatype.values = this.values.slice();
    }

    return datatype;
  }
}
