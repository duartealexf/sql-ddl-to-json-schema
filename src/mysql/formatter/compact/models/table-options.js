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

    throw new TypeError(`Unknown json id to build table options from: ${json.id}`);
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
     * @type {number|string}
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
     * @type {number|string}
     */
    this.statsAutoRecalc = undefined;

    /**
     * @type {number|string}
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
    const json = {};

    if (utils.isDefined(this.autoincrement))        { json.autoincrement        = this.autoincrement; }
    if (utils.isDefined(this.avgRowLength))         { json.avgRowLength         = this.avgRowLength; }
    if (utils.isDefined(this.charset))              { json.charset              = this.charset; }
    if (utils.isDefined(this.checksum))             { json.checksum             = this.checksum; }
    if (utils.isDefined(this.collation))            { json.collation            = this.collation; }
    if (utils.isDefined(this.comment))              { json.comment              = this.comment; }
    if (utils.isDefined(this.compression))          { json.compression          = this.compression; }
    if (utils.isDefined(this.connection))           { json.connection           = this.connection; }
    if (utils.isDefined(this.directoryName))        { json.directoryName        = this.directoryName; }
    if (utils.isDefined(this.directoryType))        { json.directoryType        = this.directoryType; }
    if (utils.isDefined(this.delayKeyWrite))        { json.delayKeyWrite        = this.delayKeyWrite; }
    if (utils.isDefined(this.encrytion))            { json.encrytion            = this.encrytion; }
    if (utils.isDefined(this.encrytionKeyId))       { json.encrytionKeyId       = this.encrytionKeyId; }
    if (utils.isDefined(this.ietfQuotes))           { json.ietfQuotes           = this.ietfQuotes; }
    if (utils.isDefined(this.engine))               { json.engine               = this.engine; }
    if (utils.isDefined(this.insertMethod))         { json.insertMethod         = this.insertMethod; }
    if (utils.isDefined(this.keyBlockSize))         { json.keyBlockSize         = this.keyBlockSize; }
    if (utils.isDefined(this.maxRows))              { json.maxRows              = this.maxRows; }
    if (utils.isDefined(this.minRows))              { json.minRows              = this.minRows; }
    if (utils.isDefined(this.packKeys))             { json.packKeys             = this.packKeys; }
    if (utils.isDefined(this.pageChecksum))         { json.pageChecksum         = this.pageChecksum; }
    if (utils.isDefined(this.password))             { json.password             = this.password; }
    if (utils.isDefined(this.rowFormat))            { json.rowFormat            = this.rowFormat; }
    if (utils.isDefined(this.statsAutoRecalc))      { json.statsAutoRecalc      = this.statsAutoRecalc; }
    if (utils.isDefined(this.statsPersistent))      { json.statsPersistent      = this.statsPersistent; }
    if (utils.isDefined(this.statsSamplePages))     { json.statsSamplePages     = this.statsSamplePages; }
    if (utils.isDefined(this.transactional))        { json.transactional        = this.transactional; }
    if (utils.isDefined(this.withSystemVersioning)) { json.withSystemVersioning = this.withSystemVersioning; }
    if (utils.isDefined(this.storagetablespace))    { json.storagetablespace    = this.storagetablespace; }
    if (utils.isDefined(this.tablespaceName))       { json.tablespaceName       = this.tablespaceName; }
    if (utils.isDefined(this.tablespaceStorage))    { json.tablespaceStorage    = this.tablespaceStorage; }
    if (utils.isDefined(this.union))                { json.union                = this.union; }

    return json;
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
