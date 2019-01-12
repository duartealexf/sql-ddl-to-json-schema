/* eslint no-unused-vars: 0 */
const Datatype = require('./datatype');
const ColumnOptions = require('./column-options');
const ColumnReference = require('./column-reference');
const PrimaryKey = require('./primary-key');
const ForeignKey = require('./foreign-key');
const UniqueKey = require('./unique-key');
const IndexColumn = require('./index-column');

const utils = require('../../../../shared/utils');

/**
 * Table column.
 */
class Column {

  /**
   * Creates a column from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {Column} Created column.
   */
  static fromDef(json) {
    if (json.id !== 'O_CREATE_TABLE_CREATE_DEFINITION') {
      throw new TypeError(`Unknown json id to build column from: ${json.id}`);
    }

    json = json.def.column;

    return Column.fromObject({
      name: json.name,
      datatype: json.def.datatype,
      reference: json.def.reference,
      columnDefinition: json.def.columnDefinition
    });
  }

  /**
   * Creates a column from an object containing needed properties.
   * Properties are 'name', 'datatype', 'reference', and 'columnDefinition'.
   *
   * @param {any} json Object containing properties.
   * @returns {Column} Resulting column.
   */
  static fromObject(json) {
    const column = new Column();

    column.name = json.name;
    column.type = Datatype.fromDef(json.datatype);

    if (json.reference) {
      column.reference = ColumnReference.fromDef(json.reference);
    }

    if (json.columnDefinition) {
      column.options = ColumnOptions.fromArray(json.columnDefinition);
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
     * Column type.
     * @type {Datatype}
     */
    this.type = undefined;

    /**
     * Column foreign key references
     * @type {ColumnReference}
     */
    this.reference = undefined;

    /**
     * Column options.
     * @type {ColumnOptions}
     */
    this.options = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      name: this.name,
      type: this.type.toJSON()
    };

    if (utils.isDefined(this.options)) { json.options = this.options.toJSON(); }
    if (utils.isDefined(this.reference)) { json.reference = this.reference.toJSON(); }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {Column} Clone.
   */
  clone() {
    const column = new Column();

    column.name = this.name;
    column.type = this.type.clone();

    if (this.options) {
      column.options = this.options.clone();
    }

    return column;
  }

  /**
   * Whether this column is primary key.
   *
   * @returns {boolean} Test result.
   */
  isPrimaryKey() {
    return this.options ? this.options.primary === true : false;
  }

  /**
   * Whether this column is unique key.
   *
   * @returns {boolean} Test result.
   */
  isUniqueKey() {
    return this.options ? this.options.unique === true : false;
  }

  /**
   * Whether this column is foreign key.
   *
   * @returns {boolean} Test result.
   */
  isForeignKey() {
    return !!this.reference;
  }

  /**
   * Extracts instance of PrimaryKey if this column is primary key.
   * Removes 'primary' property from options.
   *
   * @returns {PrimaryKey} Extracted PrimaryKey.
   */
  extractPrimaryKey() {
    if (this.isPrimaryKey()) {
      delete this.options.primary;

      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const primaryKey = new PrimaryKey();
      primaryKey.pushColumn(indexColumn);

      return primaryKey;
    }

    return null;
  }

  /**
   * Extracts instance of ForeignKey if this column references other table.
   * Removes 'reference' property from options.
   *
   * @returns {ForeignKey} Extracted ForeignKey.
   */
  extractForeignKey() {
    if (this.isForeignKey()) {
      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const foreignKey = new ForeignKey();
      foreignKey.pushColumn(indexColumn);
      foreignKey.reference = this.reference;

      delete this.reference;
      return foreignKey;
    }

    return null;
  }

  /**
   * Extracts instance of UniqueKey if this column is unique key.
   * Removes 'unique' property from options.
   *
   * @returns {UniqueKey} Extracted UniqueKey.
   */
  extractUniqueKey() {
    if (this.isUniqueKey()) {
      delete this.options.unique;

      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const uniqueKey = new UniqueKey();
      uniqueKey.columns.push(indexColumn);

      return uniqueKey;
    }

    return null;
  }
}

module.exports = Column;
