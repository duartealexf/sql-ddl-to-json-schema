/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const IndexOptions = require('./index-options');

const utils = require('../../../../shared/utils');

/**
 * Spatial index of a table.
 */
class SpatialIndex {

  /**
   * Creates a spatial index from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {SpatialIndex} Created spatial index.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return SpatialIndex.fromObject(json.def.spatialIndex);
    }

    if (json.id === 'P_CREATE_INDEX') {
      return SpatialIndex.fromObject(json.def);
    }

    throw new Error(`Unknown json id to build spatial index from: ${json.id}`);
  }

  /**
   * Creates a spatial index from an object containing needed properties.
   * Properties are 'columns', 'name', and 'options'.
   *
   * @param {any} json Object containing properties.
   * @returns {SpatialIndex} Resulting spatial index.
   */
  static fromObject(json) {
    const spatialIndex = new SpatialIndex();
    spatialIndex.columns = json.columns.map(IndexColumn.fromDef);

    if (json.name) { spatialIndex.name = json.name; }

    if (json.options.length) {
      spatialIndex.options = IndexOptions.fromArray(json.options);
    }

    return spatialIndex;
  }

  /**
   * SpatialIndex constructor.
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

module.exports = SpatialIndex;
