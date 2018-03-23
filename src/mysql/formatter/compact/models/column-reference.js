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
        columnReference.on = json.on.map(o => ColumnReferenceOn.fromObject(o));
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
     * @type {ColumnReferenceOn[]}
     */
    this.on = [];
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
    if (this.on.length)              { json.on      = this.on.map(o => o.toJSON()); }
    if (this.columns.length)         { json.columns = this.columns.map(c => c.toJSON()); }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {ColumnReference} Clone.
   */
  clone() {
    const reference = new ColumnReference();

    reference.table = this.table;

    if (utils.isDefined(this.match)) { reference.match   = this.match; }
    if (this.on.length)              { reference.on      = this.on.map(o => o.clone()); }
    if (this.columns.length)         { reference.columns = this.columns.map(c => c.clone()); }

    return reference;
  }
}

module.exports = ColumnReference;
