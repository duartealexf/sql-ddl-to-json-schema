const utils = require('../../../../shared/utils');

/**
 * Index specification of a column.
 */
class IndexColumn {

  /**
   * Creates an index column from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {IndexColumn} Created index column.
   */
  static fromDef(json) {
    if (json.id === 'P_INDEX_COLUMN') {
      json = json.def;
      const indexColumn = new IndexColumn();
      indexColumn.column = json.column;

      if (json.length) { indexColumn.length = json.length; }
      if (json.sort)   { indexColumn.sort   = json.sort; }

      return indexColumn;
    }

    throw new Error(`Unknown json id to build index column from: ${json.id}`);
  }

  /**
   * IndexColumn constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.column = undefined;

    /**
     * @type {number}
     */
    this.length = undefined;

    /**
     * @type {string}
     */
    this.sort = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      column: this.column
    };

    if (utils.isDefined(this.length)) { json.length = this.length; }
    if (utils.isDefined(this.sort))   { json.sort   = this.sort; }

    return json;
  }
}

module.exports = IndexColumn;
