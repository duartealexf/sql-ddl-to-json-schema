import { P_CREATE_INDEX } from '@typings/parsed';

import { UniqueKey } from '../unique-key';
import { FulltextIndex } from '../fulltext-index';
import { SpatialIndex } from '../spatial-index';
import { Index } from '../index';
import { TableModelInterface, DatabaseModelInterface, RuleHandler } from '../typings';

/**
 * Formatter for P_CREATE_INDEX rule's parsed JSON.
 */
export class CreateIndex implements RuleHandler {
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
   * Creates an index and adds it to one of the tables.
   *
   * @param json JSON format parsed from SQL.
   */
  handleDef(json: P_CREATE_INDEX) {
    if (json.id !== 'P_CREATE_INDEX') {
      throw new TypeError(`Expected P_CREATE_INDEX rule to be handled but received ${json.id}`);
    }

    const table = this.getTable(json.def.table);

    if (!table) {
      // throw new Error(`Found "CREATE INDEX" statement to an unexisting table ${json.def.table}`);
      return;
    }

    const type = json.def.type.toLowerCase();

    if (type.includes('unique')) {
      table.pushUniqueKey(UniqueKey.fromDef(json));
    } else if (type.includes('fulltext')) {
      table.pushFulltextIndex(FulltextIndex.fromDef(json));
    } else if (type.includes('spatial')) {
      table.pushSpatialIndex(SpatialIndex.fromDef(json));
    } else {
      table.pushIndex(Index.fromDef(json));
    }
  }
}
