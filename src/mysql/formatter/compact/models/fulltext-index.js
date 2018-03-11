/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');

const utils = require('../../../../shared/utils');

/**
 * Fulltext index of a table.
 */
class FulltextIndex {

  /**
   * Creates a fulltext index from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {FulltextIndex} Created fulltext index.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return FulltextIndex.fromObject(json.def.fulltextIndex);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return FulltextIndex.fromObject(json.def);
    }

    throw new Error(`Unknown json id to build fulltext index from: ${json.id}`);
  }

  /**
   * Creates a fulltext index from an object containing needed properties.
   * Properties are 'columns', 'name', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {FulltextIndex} Resulting fulltext index.
   */
  static fromObject(json) {
    const fulltextIndex = new FulltextIndex();
    fulltextIndex.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) { fulltextIndex.name = json.name; }

    if (json.options.length) {
      fulltextIndex.options = IndexOptions.fromArray(json.options);
    }

    return fulltextIndex;
  }

  /**
   * FulltextIndex constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.name = undefined;

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

    if (utils.isDefined(this.name))    { json.name    = this.name; }
    if (utils.isDefined(this.options)) { json.options = this.options.toJSON(); }

    return json;
  }
}

module.exports = FulltextIndex;
