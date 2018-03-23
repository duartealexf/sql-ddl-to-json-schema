/**
 * Column reference's 'on' triggers of column actions.
 */
class ColumnReferenceOn {

  /**
   * Creates column reference "on" trigger from object.
   * Object must contain properties 'trigger' and 'action'.
   *
   * @param {any} on JSON format parsed from SQL.
   * @returns {ColumnReferenceOn} Created reference trigger object.
   */
  static fromObject(on) {
    const onInstance = new ColumnReferenceOn();

    onInstance.action = on.action.toLowerCase();
    onInstance.trigger = on.trigger.toLowerCase();

    return onInstance;
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

  /**
   * Create a deep clone of this model.
   *
   * @returns {ColumnReferenceOn} Clone.
   */
  clone() {
    return ColumnReferenceOn.fromObject(this);
  }
}

module.exports = ColumnReferenceOn;
