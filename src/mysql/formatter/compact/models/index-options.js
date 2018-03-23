const utils = require('../../../../shared/utils');

/**
 * Table index options.
 */
class IndexOptions {

  /**
   * Creates index options instance from an array of options.
   *
   * @param {any[]} options JSON format parsed from SQL.
   * @returns {IndexOptions} Created index options.
   */
  static fromArray(options) {
    const indexOptions = new IndexOptions();

    options.forEach(option => {
      Object.getOwnPropertyNames(option.def)
        .map(k => [k, option.def[k]])
        .forEach(([k, v]) => { indexOptions[k] = v; });
    });

    if (indexOptions.indexType) {
      indexOptions.indexType = indexOptions.indexType.def.toLowerCase();
    }

    if (indexOptions.algorithm) { indexOptions.algorithm = indexOptions.algorithm.toLowerCase(); }
    if (indexOptions.lock)      { indexOptions.lock      = indexOptions.lock.toLowerCase(); }

    return indexOptions;
  }

  /**
   * IndexOptions constructor.
   */
  constructor() {

    /**
     * @type {number}
     */
    this.keyBlockSize = undefined;

    /**
     * @type {string}
     */
    this.indexType = undefined;

    /**
     * @type {string}
     */
    this.parser = undefined;

    /**
     * @type {string}
     */
    this.comment = undefined;

    /**
     * @type {string}
     */
    this.algorithm = undefined;

    /**
     * @type {string}
     */
    this.lock = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {};

    if (utils.isDefined(this.keyBlockSize)) { json.keyBlockSize = this.keyBlockSize; }
    if (utils.isDefined(this.indexType))    { json.indexType    = this.indexType; }
    if (utils.isDefined(this.algorithm))    { json.algorithm    = this.algorithm; }
    if (utils.isDefined(this.comment))      { json.comment      = this.comment; }
    if (utils.isDefined(this.parser))       { json.parser       = this.parser; }
    if (utils.isDefined(this.lock))         { json.lock         = this.lock; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {IndexOptions} Clone.
   */
  clone() {
    const options = new IndexOptions();

    Object.getOwnPropertyNames(this)
      .map(k => [k, this[k]])
      .filter(([, v]) => utils.isDefined(v))
      .forEach(([k, v]) => { options[k] = v; });

    return options;
  }
}

module.exports = IndexOptions;
