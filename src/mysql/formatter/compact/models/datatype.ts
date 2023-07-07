import { O_DATATYPE, DatatypeInterface } from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { DatatypeModelInterface } from './typings';

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

  binaryCollation?: boolean;

  /**
   * Creates a datatype from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_DATATYPE): Datatype {
    if (json.id === 'O_DATATYPE') {
      const datatype = new Datatype();

      Object.assign(datatype, json.def.def);

      datatype.datatype = Datatype.filterDatatype(datatype.datatype);

      return datatype;
    }

    throw new TypeError(`Unknown json id to build datatype from: ${json.id}`);
  }

  /**
   * Get standardized name for datatype, according to parsed JSON term.
   *
   * @param term Datatype term parsed JSON format.
   */
  static filterDatatype(term: string): string {
    const lowerTerm = term.toLowerCase();

    if (lowerTerm === 'integer') {
      return 'int';
    }
    if (lowerTerm === 'tinyint') {
      return 'int';
    }
    if (lowerTerm === 'smallint') {
      return 'int';
    }
    if (lowerTerm === 'mediumint') {
      return 'int';
    }
    if (lowerTerm === 'bigint') {
      return 'int';
    }
    if (lowerTerm === 'numeric') {
      return 'decimal';
    }
    if (lowerTerm === 'bool') {
      return 'boolean';
    }
    if (lowerTerm === 'tinyblob') {
      return 'blob';
    }
    if (lowerTerm === 'mediumblob') {
      return 'blob';
    }
    if (lowerTerm === 'longblob') {
      return 'blob';
    }
    if (lowerTerm === 'tinytext') {
      return 'text';
    }
    if (lowerTerm === 'mediumtext') {
      return 'text';
    }
    if (lowerTerm === 'longtext') {
      return 'text';
    }
    if (lowerTerm === 'national char') {
      return 'char';
    }
    if (lowerTerm === 'nvarchar') {
      return 'varchar';
    }
    if (lowerTerm === 'character') {
      return 'char';
    }
    if (lowerTerm === 'nchar') {
      return 'char';
    }
    if (lowerTerm === 'uniqueidentifier') {
      return 'uuid';
    }
    return lowerTerm;
  }

  /**
   * Get length that is indexable by this datatype.
   */
  getMaxIndexableSize(): number {
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
        'uuid',
      ].includes(this.datatype)
    ) {
      return 0;
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
      return 0;
    }

    /**
     * Indexable datatypes.
     */
    if (
      ['blob', 'text', 'char', 'binary', 'varchar', 'nvarchar', 'varbinary'].includes(this.datatype)
    ) {
      return this.length as number;
    }

    return 0;
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
    if (isDefined(this.binaryCollation)) {
      json.binaryCollation = this.binaryCollation;
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): Datatype {
    const datatype = new Datatype();

    datatype.datatype = this.datatype;

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
