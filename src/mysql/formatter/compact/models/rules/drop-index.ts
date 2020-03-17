import { P_DROP_INDEX } from '@mysql/compiled/typings';

import { DatabaseModelInterface, TableModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_DROP_INDEX rule's parsed JSON.
 */
export class DropIndex implements RuleHandler {
  database!: DatabaseModelInterface;

  /**
   * Get table with given name.
   *
   * @param name Table name.
   */
  getTable(name: string): TableModelInterface | undefined {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param database Database instance.
   */
  setDatabase(database: DatabaseModelInterface) {
    this.database = database;
  }

  /**
   * Drops one of the indexes in a table.
   *
   * @param json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json: P_DROP_INDEX) {
    if (json.id !== 'P_DROP_INDEX') {
      throw new TypeError(`Expected P_DROP_INDEX rule to be handled but received ${json.id}`);
    }

    const table = this.getTable(json.def.table);

    if (!table) {
      // throw new Error(`Found "DROP INDEX" statement for an unexisting table ${json.def.table}`);
      return;
    }

    const index = table.getIndex(json.def.index);

    if (!index) {
      // throw new Error(`Found "DROP INDEX" statement for an unexisting index ${json.def.index} in table ${json.def.table}`);
      return;
    }

    table.dropIndex(index);
  }
}
