import { P_COLUMN_REFERENCE } from '@mysql/compiled/typings';
import { isDefined } from '@shared/utils';

import { ColumnReferenceOn } from './column-reference-on';
import { IndexColumn } from './index-column';
import {
  ColumnReferenceModelInterface,
  ColumnReferenceInterface,
  IndexColumnModelInterface,
  ColumnReferenceOnModelInterface,
} from './typings';

/**
 * Column reference to another column in foreign keys.
 */
export class ColumnReference implements ColumnReferenceModelInterface {
  table!: string;
  match?: string;
  columns: IndexColumnModelInterface[] = [];
  on: ColumnReferenceOnModelInterface[] = [];

  /**
   * Creates a column reference from a JSON def.
   *
   * @param json JSON format parsed from SQL.
   */
  static fromDef(json: P_COLUMN_REFERENCE) {
    if (json.id === 'P_COLUMN_REFERENCE') {
      const def = json.def;
      const columnReference = new ColumnReference();

      columnReference.table = def.table;

      if (def.match) {
        columnReference.match = def.match.toLowerCase();
      }

      if (def.columns.length) {
        columnReference.columns = def.columns.map(IndexColumn.fromDef);
      }

      if (def.on.length) {
        columnReference.on = def.on.map(ColumnReferenceOn.fromObject);
      }

      return columnReference;
    }

    throw new TypeError(`Unknown json id to build column reference from: ${json.id}`);
  }

  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): ColumnReferenceInterface {
    const json: ColumnReferenceInterface = {
      table: this.table,
    };

    if (isDefined(this.match)) {
      json.match = this.match;
    }
    if (this.on && this.on.length) {
      json.on = this.on.map((o) => o.toJSON());
    }
    if (this.columns && this.columns.length) {
      json.columns = this.columns.map((c) => c.toJSON());
    }

    return json;
  }

  clone(): ColumnReference {
    const reference = new ColumnReference();

    reference.table = this.table;

    if (isDefined(this.match)) {
      reference.match = this.match;
    }
    if (this.on && this.on.length) {
      reference.on = this.on.map((o) => o.clone());
    }
    if (this.columns && this.columns.length) {
      reference.columns = this.columns.map((c) => c.clone());
    }

    return reference;
  }
}

module.exports = ColumnReference;
