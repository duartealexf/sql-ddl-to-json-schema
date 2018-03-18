/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');

const utils = require('../../../../shared/utils');

/**
 * Primary key of a table.
 */
class PrimaryKey {

  /**
   * Creates a primary key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {PrimaryKey} Created primary key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return PrimaryKey.fromObject(json.def.primaryKey);
    }

    throw new TypeError(`Unknown json id to build primary key from: ${json.id}`);
  }

  /**
   * Creates a primary key from an object containing needed properties.
   * Properties are 'columns', 'symbol', 'index' and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {PrimaryKey} Resulting primary key.
   */
  static fromObject(json) {
    const primaryKey = new PrimaryKey();
    primaryKey.columns = json.columns.map(IndexColumn.fromDef);

    if (json.symbol) { primaryKey.symbol    = json.symbol; }
    if (json.index)  { primaryKey.indexType = json.index.def.toLowerCase(); }

    if (json.options.length) {
      primaryKey.options = IndexOptions.fromArray(json.options);
    }

    return primaryKey;
  }

  /**
   * PrimaryKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.symbol = undefined;

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
    const json = {
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.options))   { json.options   = this.options.toJSON(); }
    if (utils.isDefined(this.indexType)) { json.indexType = this.indexType; }
    if (utils.isDefined(this.symbol))    { json.symbol    = this.symbol; }

    return json;
  }

  /**
   * Pushes an index column to this primary key.
   *
   * @param {IndexColumn} indexColumn Index column to be pushed.
   * @returns {void}
   */
  pushColumn(indexColumn) {
    this.columns.push(indexColumn);
  }
}

module.exports = PrimaryKey;
