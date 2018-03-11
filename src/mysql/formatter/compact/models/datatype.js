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

      Object.entries(json.def.def).forEach(([k, v]) => { datatype[k] = v; });
      datatype.datatype = Datatype.filterDatatype(datatype.datatype);

      return datatype;
    }

    throw new Error(`Unknown json id to build datatype from: ${json.id}`);
  }

  /**
   * Get standardized name for datatype, according to parsed JSON term.
   *
   * @param {string} term Datatype term parsed JSON format.
   * @returns {string} Standardized name.
   */
  static filterDatatype(term) {
    term = term.toLowerCase();
    if (term === 'integer')     { return 'int'; }
    if (term === 'tinyint')     { return 'int'; }
    if (term === 'smallint')    { return 'int'; }
    if (term === 'mediumint')   { return 'int'; }
    if (term === 'bigint')      { return 'int'; }
    if (term === 'numeric')     { return 'decimal'; }
    if (term === 'bool')        { return 'boolean'; }
    if (term === 'tinyblob')    { return 'blob'; }
    if (term === 'mediumblob')  { return 'blob'; }
    if (term === 'longblob')    { return 'blob'; }
    if (term === 'tinytext')    { return 'text'; }
    if (term === 'mediumtext')  { return 'text'; }
    if (term === 'longtext')    { return 'text'; }
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
     * @type {number}
     */
    this.width = undefined;

    /**
     * @type {number}
     */
    this.digits = undefined;

    /**
     * @type {number}
     */
    this.decimals = undefined;

    /**
     * @type {number}
     */
    this.length = undefined;

    /**
     * @type {number}
     */
    this.fractional = undefined;

    /**
     * @type {string[]}
     */
    this.values = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    return Object.entries(this)
      .filter(([k, v]) =>
        utils.isDefined(this[k])
      )
      .reduce((obj, [k, v]) => {
        obj[k] = v;
        return obj;
      }, {});
  }
}

module.exports = Datatype;
