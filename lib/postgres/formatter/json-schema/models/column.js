const Datatype = require('./datatype');

const utils = require('../../../../shared/utils');

/**
 * Table column.
 */
class Column {

  /**
   * Create Column instance from compact JSON format.
   *
   * @param {any} json Column in compact JSON format.
   * @returns {Column} Built column instance.
   */
  static fromCompactJson(json) {
    const column = new Column();

    column.datatype = Datatype.fromCompactJson(json.type);
    column.name = json.name;

    const options = json.options;

    if (options) {
      if (options.unsigned) {
        column.datatype.isUnsigned = options.unsigned;
      }

      if (options.default === null || utils.isString(options.default) && options.default.length) {
        column.default = options.default;
      }

      if (utils.isString(options.comment) && options.comment.length) {
        column.comment = options.comment;
      }

      column.isNullable = options.nullable;
    }

    return column;
  }

  /**
   * Column constructor.
   */
  constructor() {

    /**
     * Column name.
     * @type {string}
     */
    this.name = undefined;

    /**
     * Column data type.
     * @type {Datatype}
     */
    this.datatype = undefined;

    /**
     * Whether column is nullable.
     * @type {boolean}
     */
    this.isNullable = undefined;

    /**
     * Whether column is primary key.
     * @type {boolean}
     */
    this.isPrimaryKey = undefined;

    /**
     * Column comment.
     * @type {string}
     */
    this.comment = undefined;

    /**
     * Column default value.
     * @type {boolean|string|number}
     */
    this.default = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {};
    const type = this.datatype.toJSON();

    /**
     * Special treatment for primary keys.
     */
    if (this.isPrimaryKey === true) {
      json.$comment = 'primary key';
      type.minimum = 1;
    }

    if (utils.isDefined(this.comment)) {
      json.description = this.comment;
    }

    Object.getOwnPropertyNames(type)
      .map(k => [k, type[k]])
      .filter(([, v]) => {
        return utils.isNumber(v) ? isFinite(v) : true;
      })
      .forEach(([k, v]) => { json[k] = v; });

    if (typeof this.default !== 'undefined') {
      json.default = this.default;
    }

    return json;
  }
}

module.exports = Column;
