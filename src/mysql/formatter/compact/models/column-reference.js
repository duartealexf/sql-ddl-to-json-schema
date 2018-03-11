/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const ColumnReferenceOn = require('./column-reference-on');

const utils = require('../../../../shared/utils');

/**
 * Column reference to another column in foreign keys.
 */
class ColumnReference {

  /**
   * Creates a column reference from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {ColumnReference} Created column reference.
   */
  static fromDef(json) {
    if (json.id === 'P_COLUMN_REFERENCE') {
      json = json.def;
      const columnReference = new ColumnReference();

      columnReference.table = json.table;

      if (json.match) { columnReference.match = json.match.toLowerCase(); }

      if (json.columns.length) {
        columnReference.columns = json.columns.map(IndexColumn.fromDef);
      }

      if (json.on.length) {
        columnReference.on = ColumnReferenceOn.fromArray(json.on);
      }

      return columnReference;
    }

    throw new TypeError(`Unknown json id to build column reference from: ${json.id}`);
  }

  /**
   * ColumnReference constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.table = undefined;

    /**
     * @type {IndexColumn[]}
     */
    this.columns = [];

    /**
     * @type {string}
     */
    this.match = undefined;

    /**
     * @type {ColumnReferenceOn}
     */
    this.on = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {};

    json.table = this.table;

    if (utils.isDefined(this.match)) { json.match   = this.match; }
    if (utils.isDefined(this.on))    { json.on      = this.on.toJSON(); }

    if (this.columns.length)         { json.columns = this.columns.map(c => c.toJSON()); }

    return json;
  }
}

module.exports = ColumnReference;
