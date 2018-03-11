/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const ColumnReference = require('./column-reference');

const utils = require('../../../../shared/utils');

/**
 * Foreign key of a table.
 */
class ForeignKey {

  /**
   * Creates a foreign key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {ForeignKey} Created foreign key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return ForeignKey.fromObject(json.def.foreignKey);
    }

    throw new Error(`Unknown json id to build foreign key from: ${json.id}`);
  }

  /**
   * Creates a foreign key from an object containing needed properties.
   * Properties are 'columns', 'reference', 'symbol', and 'name'.
   *
   * @param {any} json Object containing properties.
   * @returns {ForeignKey} Resulting foreign key.
   */
  static fromObject(json) {
    const foreignKey = new ForeignKey();
    foreignKey.columns = json.columns.map(IndexColumn.fromDef);
    foreignKey.reference = ColumnReference.fromDef(json.reference);

    if (json.symbol) { foreignKey.symbol = json.symbol; }
    if (json.name)   { foreignKey.name   = json.name; }

    return foreignKey;
  }

  /**
   * ForeignKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.symbol = undefined;

    /**
     * @type {string}
     */
    this.name = undefined;

    /**
     * @type {IndexColumn[]}
     */
    this.columns = [];

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
    const json = {
      columns: this.columns.map(c => c.toJSON()),
      reference: this.reference.toJSON()
    };

    if (utils.isDefined(this.symbol)) { json.symbol = this.symbol; }
    if (utils.isDefined(this.name))   { json.name   = this.name; }

    return json;
  }

  /**
   * Push an index column to columns array.
   *
   * @param {IndexColumn} indexColumn Index column to be pushed.
   * @returns {void}
   */
  pushColumn(indexColumn) {
    this.columns.push(indexColumn);
  }
}

module.exports = ForeignKey;
