const utils = require('../../../../shared/utils');

/**
 * Data type.
 */
class Datatype {

  /**
   * Creates a datatype from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {Datatype} Created datatype.
   */
  static fromDef(json) {
    if (json.id === 'O_DATATYPE') {
      const datatype = new Datatype();

      Object.getOwnPropertyNames(json.def.def)
        .map(k => [k, json.def.def[k]])
        .forEach(([k, v]) => { datatype[k] = v; });

      datatype.datatype = Datatype.filterDatatype(datatype.datatype);

      return datatype;
    }

    throw new TypeError(`Unknown json id to build datatype from: ${json.id}`);
  }

  /**
   * Get standardized name for datatype, according to parsed JSON term.
   *
   * @param {string} term Datatype term parsed JSON format.
   * @returns {string} Standardized name.
   */
  static filterDatatype(term) {
    term = term.toLowerCase();
    if (term === 'integer')       { return 'int'; }
    if (term === 'tinyint')       { return 'int'; }
    if (term === 'smallint')      { return 'int'; }
    if (term === 'mediumint')     { return 'int'; }
    if (term === 'bigint')        { return 'int'; }
    if (term === 'numeric')       { return 'decimal'; }
    if (term === 'bool')          { return 'boolean'; }
    if (term === 'tinyblob')      { return 'blob'; }
    if (term === 'mediumblob')    { return 'blob'; }
    if (term === 'longblob')      { return 'blob'; }
    if (term === 'tinytext')      { return 'text'; }
    if (term === 'mediumtext')    { return 'text'; }
    if (term === 'longtext')      { return 'text'; }
    if (term === 'national char') { return 'char'; }
    if (term === 'character')     { return 'char'; }
    if (term === 'nchar')         { return 'char'; }
    return term;
  }

  /**
   * Datatype constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.datatype = undefined;

    /**
     * Width for integer datatypes.
     * @type {number}
     */
    this.width = undefined;

    /**
     * Digits for numeric non-integer and year datatypes.
     * @type {number}
     */
    this.digits = undefined;

    /**
     * Decimals for numeric non-integer datatypes.
     * @type {number}
     */
    this.decimals = undefined;

    /**
     * Length of bit, blob, binary and string datatypes.
     * @type {number}
     */
    this.length = undefined;

    /**
     * Number of fractionals for datetime datatypes.
     * @type {number}
     */
    this.fractional = undefined;

    /**
     * Values for enum and set datatypes.
     * @type {string[]}
     */
    this.values = undefined;
  }

  /**
   * Get length that is indexable by this datatype.
   * @returns {number} Indexable length.
   */
  getMaxIndexableSize() {
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
      return null;
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
      return null;
    }

    /**
     * Indexable datatypes.
     */
    if (
      [
        'blob',
        'text',
        'char',
        'binary',
        'varchar',
        'varbinary',
      ].includes(this.datatype)
    ) {
      return this.length;
    }

    /**
     * Fallback, unknown or non-mapped datatype
     * (actually shouldn't fall here).
     */
    return null;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      datatype: this.datatype
    };

    if (utils.isDefined(this.width))      { json.width      = this.width; }
    if (utils.isDefined(this.digits))     { json.digits     = this.digits; }
    if (utils.isDefined(this.decimals))   { json.decimals   = this.decimals; }
    if (utils.isDefined(this.length))     { json.length     = this.length; }
    if (utils.isDefined(this.fractional)) { json.fractional = this.fractional; }
    if (utils.isDefined(this.values))     { json.values     = this.values; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {Datatype} Clone.
   */
  clone() {
    const datatype = new Datatype();

    Object.getOwnPropertyNames(this)
      .map(k => [k, this[k]])
      .filter(([, v]) => utils.isDefined(v))
      .forEach(([k, v]) => { datatype[k] = v; });

    if (datatype.values) {
      datatype.values = datatype.values.slice();
    }

    return datatype;
  }
}

module.exports = Datatype;
