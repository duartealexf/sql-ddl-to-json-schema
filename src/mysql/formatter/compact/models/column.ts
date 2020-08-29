import {
  O_CREATE_TABLE_CREATE_DEFINITION,
  O_CREATE_TABLE_CREATE_DEFINITION_COLUMN,
  O_ALTER_TABLE_SPEC_ADD_COLUMNS_COLUMN,
  ColumnInterface,
} from '../../../../typings';
import { isDefined } from '../../../../shared/utils';

import { ColumnReference } from './column-reference';
import { ColumnOptions } from './column-options';
import { IndexColumn } from './index-column';
import { PrimaryKey } from './primary-key';
import { ForeignKey } from './foreign-key';
import { UniqueKey } from './unique-key';
import {
  PrimaryKeyModelInterface,
  ForeignKeyModelInterface,
  UniqueKeyModelInterface,
  ColumnModelInterface,
  DatatypeModelInterface,
  ColumnReferenceModelInterface,
  ColumnOptionsModelInterface,
} from './typings';
import { Datatype } from './datatype';

/**
 * Table column.
 */
export class Column implements ColumnModelInterface {
  name!: string;

  type!: DatatypeModelInterface;

  reference?: ColumnReferenceModelInterface;

  options?: ColumnOptionsModelInterface;

  /**
   * Creates a column from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: O_CREATE_TABLE_CREATE_DEFINITION): Column {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      const column = json.def.column as O_CREATE_TABLE_CREATE_DEFINITION_COLUMN;

      return Column.fromObject({
        name: column.name,
        datatype: column.def.datatype,
        reference: column.def.reference,
        columnDefinition: column.def.columnDefinition,
      });
    }

    throw new TypeError(`Unknown json id to build column from: ${json.id}`);
  }

  /**
   * Creates a column from an object containing needed properties.
   *
   * @param json Object containing properties.
   */
  static fromObject(json: O_ALTER_TABLE_SPEC_ADD_COLUMNS_COLUMN): Column {
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
   * JSON casting of this object calls this method.
   */
  toJSON(): ColumnInterface {
    const json: ColumnInterface = {
      name: this.name,
      type: this.type.toJSON(),
    };

    if (isDefined(this.options)) {
      json.options = this.options.toJSON();
    }
    if (isDefined(this.reference)) {
      json.reference = this.reference.toJSON();
    }

    return json;
  }

  /**
   * Create a deep clone of this model.
   */
  clone(): Column {
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
   */
  isPrimaryKey(): boolean {
    return this.options ? this.options.primary === true : false;
  }

  /**
   * Whether this column is unique key.
   */
  isUniqueKey(): boolean {
    return this.options ? this.options.unique === true : false;
  }

  /**
   * Whether this column is foreign key.
   */
  isForeignKey(): boolean {
    return !!this.reference;
  }

  /**
   * Extracts instance of PrimaryKey if this column is primary key.
   * Removes 'primary' property from options.
   */
  extractPrimaryKey(): PrimaryKeyModelInterface | undefined {
    if (!this.isPrimaryKey()) {
      return undefined;
    }

    delete (this.options as ColumnOptionsModelInterface).primary;

    const indexColumn = new IndexColumn();
    indexColumn.column = this.name;

    const primaryKey = new PrimaryKey();
    primaryKey.pushColumn(indexColumn);

    return primaryKey;
  }

  /**
   * Extracts instance of ForeignKey if this column references other table.
   * Removes 'reference' property from options.
   */
  extractForeignKey(): ForeignKeyModelInterface | undefined {
    if (!this.isForeignKey()) {
      return undefined;
    }

    const indexColumn = new IndexColumn();
    indexColumn.column = this.name;

    const foreignKey = new ForeignKey();
    foreignKey.pushColumn(indexColumn);

    foreignKey.reference = this.reference as ColumnReferenceModelInterface;

    delete this.reference;
    return foreignKey;
  }

  /**
   * Extracts instance of UniqueKey if this column is unique key.
   * Removes 'unique' property from options.
   */
  extractUniqueKey(): UniqueKeyModelInterface | undefined {
    if (!this.isUniqueKey()) {
      return undefined;
    }
    delete (this.options as ColumnOptionsModelInterface).unique;

    const indexColumn = new IndexColumn();
    indexColumn.column = this.name;

    const uniqueKey = new UniqueKey();
    uniqueKey.columns.push(indexColumn);

    return uniqueKey;
  }
}
