import { P_DDS } from '../../../../typings';

import { CreateTable } from './rules/create-table';
import { CreateIndex } from './rules/create-index';
import { AlterTable } from './rules/alter-table';
import { RenameTable } from './rules/rename-table';
import { DropTable } from './rules/drop-table';
import { DropIndex } from './rules/drop-index';
import { DatabaseModelInterface, TableModelInterface, RuleHandler } from './typings';

/**
 * Database, which contains DDS array as its json.def.
 * It is a formatter for MAIN parser rule.
 */
export class Database implements DatabaseModelInterface {
  ddsCollection: P_DDS[] = [];

  tables: TableModelInterface[] = [];

  /**
   * Get tables from parsed DDS array.
   */
  getTables(): TableModelInterface[] {
    return this.tables;
  }

  /**
   * Setter for tables.
   *
   * @param tables Updated tables.
   */
  setTables(tables: TableModelInterface[]): void {
    this.tables = tables;
  }

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | undefined {
    return this.tables.find((t) => t.name === name);
  }

  /**
   * Pushes a table to database.
   *
   * @param table Table to be added.
   */
  pushTable(table: TableModelInterface): void {
    /**
     * Do not add table with same name.
     */
    if (this.tables.some((t) => t.name === table.name)) {
      return;
    }

    this.tables.push(table);
  }

  /**
   * Build tables array from parsed DDL statements by sending them to
   * appropriate handlers, updating tables array after each statement.
   *
   * @param ddsCollection DDS statements array.
   */
  parseDdsCollection(ddsCollection: P_DDS[]): void {
    this.ddsCollection = ddsCollection;

    this.ddsCollection.forEach((dds) => {
      /**
       * Statements such as SET are supported by parser
       * but are ignored, returning null DDS.
       */
      if (!dds) {
        return;
      }

      const json = dds.def;
      const handler = Database.getHandler(json.id);

      /**
       * There may be other handlers, which will not have
       * any effect over tables, and should be ignored.
       * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/41
       */
      if (!handler) {
        return;
      }

      handler.setDatabase(this);
      handler.handleDef(json);
    });
  }

  /**
   * Get statement handler from json id.
   *
   * @param id
   */
  private static getHandler(id: string): RuleHandler | undefined {
    if (id === 'P_CREATE_TABLE') {
      return new CreateTable();
    } if (id === 'P_CREATE_INDEX') {
      return new CreateIndex();
    } if (id === 'P_ALTER_TABLE') {
      return new AlterTable();
    } if (id === 'P_RENAME_TABLE') {
      return new RenameTable();
    } if (id === 'P_DROP_TABLE') {
      return new DropTable();
    } if (id === 'P_DROP_INDEX') {
      return new DropIndex();
    }

    return undefined;
  }
}
