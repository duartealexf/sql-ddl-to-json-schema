import { CreateTable } from './rules/create-table';
import { CreateIndex } from './rules/create-index';
import { AlterTable } from './rules/alter-table';
import { RenameTable } from './rules/rename-table';
import { DropTable } from './rules/drop-table';
import { DropIndex } from './rules/drop-index';

import { Table } from './table';

import { DatabaseInterface } from './typings';
import { P_DDS } from '@mysql/compiled/typings';

/**
 * Database, which contains DDS array as its json.def.
 * It is a formatter for MAIN parser rule.
 */
export class Database implements DatabaseInterface {
  ddsCollection: P_DDS[] = [];
  tables: Table[] = [];

  /**
   * Get tables from parsed DDS array.
   */
  getTables(): Table[] {
    return this.tables;
  }

  /**
   * Setter for tables.
   *
   * @param tables Updated tables.
   */
  setTables(tables: Table[]) {
    this.tables = tables;
  }

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): Table | undefined {
    return this.tables.find(t => t.name === name);
  }

  /**
   * Pushes a table to database.
   *
   * @param table Table to be added.
   */
  pushTable(table: Table) {
    /**
     * Do not add table with same name.
     */
    if (this.tables.some(t => t.name === table.name)) {
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
  parseDdsCollection(ddsCollection: P_DDS[]) {
    this.ddsCollection = ddsCollection;

    this.ddsCollection.forEach(dds => {
      /**
       * Statements such as SET are supported by parser
       * but are ignored, returning null DDS.
       */
      if (!dds) {
        return;
      }

      const json = dds.def;
      let handler;

      if (json.id === 'P_CREATE_TABLE') {
        handler = new CreateTable();
      }

      else if (json.id === 'P_CREATE_INDEX') {
        handler = new CreateIndex();
      }

      else if (json.id === 'P_ALTER_TABLE') {
        handler = new AlterTable();
      }

      else if (json.id === 'P_RENAME_TABLE') {
        handler = new RenameTable();
      }

      else if (json.id === 'P_DROP_TABLE') {
        handler = new DropTable();
      }

      else if (json.id === 'P_DROP_INDEX') {
        handler = new DropIndex();
      }

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
}
