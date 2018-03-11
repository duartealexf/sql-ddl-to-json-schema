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
      Object.entries(option.def).forEach(([k, v]) => { indexOptions[k] = v; });
    });

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
    return Object.entries(this)
      .filter(([k, v]) =>
        utils.isDefined(this[k])
      )
      .reduce((obj, [k, v]) => {
        obj[k] = v;
        return obj;
      }, {});
  }
}

module.exports = IndexOptions;
