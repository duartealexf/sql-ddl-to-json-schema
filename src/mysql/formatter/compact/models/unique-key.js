/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');

const utils = require('../../../../shared/utils');

/**
 * Unique key of a table.
 */
class UniqueKey {

  /**
   * Creates a unique key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {UniqueKey} Created unique key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return UniqueKey.fromObject(json.def.uniqueKey);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return UniqueKey.fromObject(json.def);
    }

    throw new TypeError(`Unknown json id to build unique key from: ${json.id}`);
  }

  /**
   * Creates an unique key from an object containing needed properties.
   * Properties are 'columns', 'symbol', 'name', 'index', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {UniqueKey} Resulting unique key.
   */
  static fromObject(json) {
    const uniqueKey = new UniqueKey();
    uniqueKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.symbol) { uniqueKey.symbol    = json.symbol; }
    if (json.name)   { uniqueKey.name      = json.name; }
    if (json.index)  { uniqueKey.indexType = json.index.def.toLowerCase(); }

    if (json.options.length) {
      uniqueKey.options = IndexOptions.fromArray(json.options);
    }

    return uniqueKey;
  }

  /**
   * UniqueKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.symbol = undefined;

    /**
     * @type {string}
     */
    this.name = undefined;

    /**
     * @type {string}
     */
    this.indexType = undefined;

    /**
     * @type {IndexColumn[]}
     */
    this.columns = [];

    /**
     * @type {IndexOptions}
     */
    this.options = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {};

    json.columns = this.columns.map(c => c.toJSON());

    if (utils.isDefined(this.symbol))     { json.symbol     = this.symbol; }
    if (utils.isDefined(this.name))       { json.name       = this.name; }
    if (utils.isDefined(this.indexType))  { json.indexType  = this.indexType; }
    if (utils.isDefined(this.options))    { json.options    = this.options.toJSON(); }

    return json;
  }
}

module.exports = UniqueKey;
