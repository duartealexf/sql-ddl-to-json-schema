const utils = require('../../../../shared/utils');

/**
 * Column reference's 'on' triggers of column actions.
 */
class ColumnReferenceOn {

  /**
   * Creates column reference "on" trigger mapping from an array.
   *
   * @param {any[]} onArray JSON format parsed from SQL.
   * @returns {ColumnReferenceOn} Created reference trigger map.
   */
  static fromArray(onArray) {
    const onMapping = new ColumnReferenceOn();

    onArray.forEach(on => {
      Object.entries(on).forEach(([k, v]) => {
        k = k.toLowerCase();
        v = v.toLowerCase();
        onMapping[k] = v;
      });
    });

    return onMapping;
  }

  /**
   * ColumnReferenceOn constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.trigger = undefined;

    /**
     * @type {string}
     */
    this.action = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    return {
      trigger: this.trigger,
      action: this.action
    };
  }
}

module.exports = ColumnReferenceOn;
