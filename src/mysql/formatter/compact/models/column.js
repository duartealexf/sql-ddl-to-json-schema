/* eslint no-unused-vars: 0 */
const Datatype = require('./datatype');
const ColumnOptions = require('./column-options');
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
      throw new Error(`Unknown json id to build column from: ${json.id}`);
    }

    json = json.def.column;

    return Column.fromObject({
      name: json.name,
      datatype: json.def.datatype,
      columnDefinition: json.def.columnDefinition
    });
  }

  /**
   * Creates a column from an object containing needed properties.
   * Properties are 'name', 'datatype', and 'columnDefinition'.
   *
   * @param {any} json Object containing properties.
   * @returns {Column} Resulting column.
   */
  static fromObject(json) {
    const column = new Column();

    column.name = json.name;
    column.type = Datatype.fromDef(json.datatype);

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
     * Column options.
     * @type {ColumnOptions}
     */
    this.options = undefined;

    this.isPrimaryKeyExtracted = false;
    this.isForeignKeyExtracted = false;
    this.isUniqueKeyExtracted = false;

    /**
     * Primary key instance extracted from this column.
     * @type {PrimaryKey}
     */
    this.extractedPrimaryKey = null;

    /**
     * Foreign key instance extracted from this column.
     * @type {ForeignKey}
     */
    this.extractedForeignKey = null;

    /**
     * Unique key instance extracted from this column.
     * @type {UniqueKey}
     */
    this.extractedUniqueKey = null;
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

    return json;
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
    return this.options ? utils.isDefined(this.options.reference) : false;
  }

  /**
   * Extracts instance of PrimaryKey if this column is primary key.
   * Removes 'primary' property from options.
   *
   * @returns {PrimaryKey} Extracted PrimaryKey.
   */
  extractPrimaryKey() {
    if (this.isPrimaryKeyExtracted) {
      return this.extractedPrimaryKey;
    }

    if (this.isPrimaryKey()) {
      delete this.options.primary;

      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const primaryKey = new PrimaryKey();
      primaryKey.pushColumn(indexColumn);

      this.extractedPrimaryKey = primaryKey;
      this.isPrimaryKeyExtracted = true;
    }

    return this.extractedPrimaryKey;
  }

  /**
   * Extracts instance of ForeignKey if this column references other table.
   * Removes 'reference' property from options.
   *
   * @returns {ForeignKey} Extracted ForeignKey.
   */
  extractForeignKey() {
    if (this.isForeignKeyExtracted) {
      return this.extractedForeignKey;
    }

    if (this.isForeignKey()) {
      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const foreignKey = new ForeignKey();
      foreignKey.pushColumn(indexColumn);
      foreignKey.reference = this.options.reference;

      delete this.options.reference;
      this.extractedForeignKey = foreignKey;
      this.isForeignKeyExtracted = true;
    }

    return this.extractedForeignKey;
  }

  /**
   * Extracts instance of UniqueKey if this column is unique key.
   * Removes 'unique' property from options.
   *
   * @returns {UniqueKey} Extracted UniqueKey.
   */
  extractUniqueKey() {
    if (this.isUniqueKeyExtracted) {
      return this.extractedUniqueKey;
    }

    if (this.isUniqueKey()) {
      delete this.options.unique;

      const indexColumn = new IndexColumn();
      indexColumn.column = this.name;

      const uniqueKey = new UniqueKey();
      uniqueKey.columns.push(indexColumn);

      this.extractedUniqueKey = uniqueKey;
      this.isUniqueKeyExtracted = true;
    }

    return this.extractedUniqueKey;
  }
}

module.exports = Column;
