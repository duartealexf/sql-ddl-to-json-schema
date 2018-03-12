/* eslint no-unused-vars: 0 */
const ColumnReference = require('./column-reference');

const utils = require('../../../../shared/utils');

/**
 * Options of a table column.
 */
class ColumnOptions {

  /**
   * Creates column options instance from an array of definitions.
   *
   * @param {any[]} definitions JSON format parsed from SQL.
   * @returns {ColumnOptions} Created index options.
   */
  static fromArray(definitions) {
    const columnOptions = new ColumnOptions();

    definitions.forEach(columnDefinition => {
      Object.entries(columnDefinition.def).forEach(([k, v]) => { columnOptions[k] = v; });
    });

    [
      'collation',
      'charset',
      'storage',
      'format',
    ].forEach(prop => {
      if (columnOptions[prop]) { columnOptions[prop] = columnOptions[prop].toLowerCase(); }
    });

    if (columnOptions.reference) {
      columnOptions.reference = ColumnReference.fromDef(columnOptions.reference);
    }

    /**
     * If column is not 'NOT NULL', consider it 'NULL DEFAULT NULL'.
     */
    if (!utils.isDefined(columnOptions.nullable)) {
      columnOptions.nullable = true;
    }

    return columnOptions;
  }

  /**
   * ColumnOptions constructor.
   */
  constructor() {

    /**
     * @type {boolean}
     */
    this.unsigned = undefined;

    /**
     * @type {boolean}
     */
    this.zerofill = undefined;

    /**
     * @type {string}
     */
    this.charset = undefined;

    /**
     * @type {string}
     */
    this.collation = undefined;

    /**
     * @type {boolean}
     */
    this.nullable = undefined;

    /**
     * @type {any}
     */
    this.default = undefined;

    /**
     * @type {boolean}
     */
    this.autoincrement = undefined;

    /**
     * @type {boolean}
     */
    this.unique = undefined;

    /**
     * @type {boolean}
     */
    this.primary = undefined;

    /**
     * @type {string}
     */
    this.comment = undefined;

    /**
     * @type {boolean}
     */
    this.invisibleWithSystemVersioning = undefined;

    /**
     * @type {boolean}
     */
    this.invisibleWithoutSystemVersioning = undefined;

    /**
     * @type {boolean}
     */
    this.invisible = undefined;

    /**
     * @type {string}
     */
    this.format = undefined;

    /**
     * @type {string}
     */
    this.storage = undefined;

    /**
     * @type {ColumnReference}
     */
    this.reference = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {};

    if (utils.isDefined(this.unsigned))      { json.unsigned      = this.unsigned; }
    if (utils.isDefined(this.zerofill))      { json.zerofill      = this.zerofill; }
    if (utils.isDefined(this.charset))       { json.charset       = this.charset; }
    if (utils.isDefined(this.collation))     { json.collation     = this.collation; }
    if (utils.isDefined(this.nullable))      { json.nullable      = this.nullable; }
    if (utils.isDefined(this.nullable))      { json.nullable      = this.nullable; }
    if (utils.isDefined(this.default))       { json.default       = this.default; }
    if (utils.isDefined(this.autoincrement)) { json.autoincrement = this.autoincrement; }
    if (utils.isDefined(this.unique))        { json.unique        = this.unique; }
    if (utils.isDefined(this.primary))       { json.primary       = this.primary; }
    if (utils.isDefined(this.invisible))     { json.invisible     = this.invisible; }
    if (utils.isDefined(this.format))        { json.format        = this.format; }
    if (utils.isDefined(this.storage))       { json.storage       = this.storage; }
    if (utils.isDefined(this.comment))       { json.comment       = this.comment; }
    if (utils.isDefined(this.reference))     { json.reference     = this.reference.toJSON(); }

    if (utils.isDefined(this.invisibleWithSystemVersioning)) {
      json.invisibleWithSystemVersioning = this.invisibleWithSystemVersioning;
    }

    if (utils.isDefined(this.invisibleWithoutSystemVersioning)) {
      json.invisibleWithoutSystemVersioning = this.invisibleWithoutSystemVersioning;
    }

    return json;
  }

  /**
   * Merge this option instance with another one. {
   * json..
 = .this..
;}


return json;* Common properties of this instance are overwritten.
   *
   * @param {ColumnOptions} options JSON format parsed from SQL.
   * @returns {void}
   */
  mergeWith(options) {
    Object.entries(options).forEach(([k, v]) => { this[k] = v; });
  }

}

module.exports = ColumnOptions;
