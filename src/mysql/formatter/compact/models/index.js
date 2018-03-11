/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');
const Table = require('./table');

const utils = require('../../../../shared/utils');

/**
 * Table index.
 */
class Index {

  /**
   * Creates an index from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {Index} Created index.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return Index.fromObject(json.def.index);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return Index.fromObject(json.def);
    }

    throw new Error(`Unknown json id to build index from: ${json.id}`);
  }

  /**
   * Creates an index from an object containing needed properties.
   * Properties are 'columns', 'name', 'index', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {Index} Resulting index.
   */
  static fromObject(json) {
    const index = new Index();
    index.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name)  { index.name      = json.name; }
    if (json.index) { index.indexType = json.index.def; }

    if (json.options.length) {
      index.options = IndexOptions.fromArray(json.options);
    }

    return index;
  }

  /**
   * Index constructor.
   */
  constructor() {

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
    const json = {
      columns: this.columns.map(c => c.toJSON())
    };

    if (utils.isDefined(this.options))   { json.options   = this.options.toJSON(); }
    if (utils.isDefined(this.indexType)) { json.indexType = this.indexType; }
    if (utils.isDefined(this.name))      { json.name      = this.name; }

    return json;
  }
}

module.exports = Index;
