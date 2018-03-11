const utils = require('../../../../shared/utils');

/**
 * Class to represent table options as parsed from SQL.
 */
class TableOptions {

  /**
   * Creates table options from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {TableOptions} Created table options.
   */
  static fromDef(json) {
    if (json.id === 'P_CREATE_TABLE_OPTIONS') {
      return TableOptions.fromArray(json.def);
    }

    throw new Error(`Unknown json id to build table options from: ${json.id}`);
  }

  /**
   * Creates table options instance from an array of options.
   *
   * @param {any[]} options JSON format parsed from SQL.
   * @returns {TableOptions} Created table options.
   */
  static fromArray(options) {
    const tableOptions = new TableOptions();

    options.forEach(option => {
      Object.entries(option.def).forEach(([k, v]) => { tableOptions[k] = v; });
    });

    return tableOptions;
  }

  /**
   * TableOptions constructor.
   */
  constructor() {

    /**
     * @type {number}
     */
    this.autoincrement = undefined;

    /**
     * @type {number}
     */
    this.avgRowLength = undefined;

    /**
     * @type {string}
     */
    this.charset = undefined;

    /**
     * @type {number}
     */
    this.checksum = undefined;

    /**
     * @type {string}
     */
    this.collation = undefined;

    /**
     * @type {string}
     */
    this.comment = undefined;

    /**
     * @type {string}
     */
    this.compression = undefined;

    /**
     * @type {string}
     */
    this.connection = undefined;

    /**
     * @type {string}
     */
    this.directoryName = undefined;

    /**
     * @type {string}
     */
    this.directoryType = undefined;

    /**
     * @type {number}
     */
    this.delayKeyWrite = undefined;

    /**
     * @type {string}
     */
    this.encrytion = undefined;

    /**
     * @type {number}
     */
    this.encrytionKeyId = undefined;

    /**
     * @type {string}
     */
    this.ietfQuotes = undefined;

    /**
     * @type {string}
     */
    this.engine = undefined;

    /**
     * @type {string}
     */
    this.insertMethod = undefined;

    /**
     * @type {number}
     */
    this.keyBlockSize = undefined;

    /**
     * @type {number}
     */
    this.maxRows = undefined;

    /**
     * @type {number}
     */
    this.minRows = undefined;

    /**
     * @type {number}
     */
    this.packKeys = undefined;

    /**
     * @type {number}
     */
    this.pageChecksum = undefined;

    /**
     * @type {string}
     */
    this.password = undefined;

    /**
     * @type {string}
     */
    this.rowFormat = undefined;

    /**
     * @type {string}
     */
    this.statsAutoRecalc = undefined;

    /**
     * @type {number}
     */
    this.statsPersistent = undefined;

    /**
     * @type {string}
     */
    this.statsSamplePages = undefined;

    /**
     * @type {number}
     */
    this.transactional = undefined;

    /**
     * @type {boolean}
     */
    this.withSystemVersioning = undefined;

    /**
     * @type {string}
     */
    this.storagetablespace = undefined;

    /**
     * @type {string}
     */
    this.tablespaceName = undefined;

    /**
     * @type {string}
     */
    this.tablespaceStorage = undefined;

    /**
     * @type {string[]}
     */
    this.union = undefined;
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
   * @param {TableOptions} options JSON format parsed from SQL.
   * @returns {void}
   */
  mergeWith(options) {
    Object.entries(options).forEach(([k, v]) => { this[k] = v; });
  }
}

module.exports = TableOptions;
