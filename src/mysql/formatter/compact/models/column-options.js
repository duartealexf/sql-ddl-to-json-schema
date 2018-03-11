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

    if (columnOptions.collation) { columnOptions.collation = columnOptions.collation.toLowerCase(); }
    if (columnOptions.charset) { columnOptions.charset = columnOptions.charset.toLowerCase(); }
    if (columnOptions.storage) { columnOptions.storage = columnOptions.storage.toLowerCase(); }
    if (columnOptions.format) { columnOptions.format = columnOptions.format.toLowerCase(); }

    if (columnOptions.reference) {
      columnOptions.reference = ColumnReference.fromDef(columnOptions.reference);
    }

    /**
     * If column is not 'NOT NULL', consider it 'NULL DEFAULT NULL'.
     */
    if (!utils.isDefined(columnOptions.nullable)) {
      columnOptions.default = null;
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
    return Object.entries(this)
      .filter(([k, v]) =>
        utils.isDefined(this[k])
      )
      .reduce((obj, [k, v]) => {
        obj[k] = v;
        return obj;
      }, {});
  }

  /**
   * Merge this option instance with another one.
   * Common properties of this instance are overwritten.
   *
   * @param {ColumnOptions} options JSON format parsed from SQL.
   * @returns {void}
   */
  mergeWith(options) {
    Object.entries(options).forEach(([k, v]) => { this[k] = v; });
  }

}

module.exports = ColumnOptions;
