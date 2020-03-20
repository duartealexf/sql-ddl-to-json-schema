import {
  P_DDS,
  O_POSITION,
  STATEMENT,
  TableInterface,
  ColumnInterface,
  TableOptionsInterface,
  FulltextIndexInterface,
  SpatialIndexInterface,
  ForeignKeyInterface,
  UniqueKeyInterface,
  IndexInterface,
  PrimaryKeyInterface,
  DatatypeInterface,
  ColumnReferenceInterface,
  ColumnOptionsInterface,
  IndexColumnInterface,
  ColumnReferenceOnInterface,
  IndexOptionsInterface,
} from '../../../../typings';

export interface ClonableInterface {
  /**
   * Create a clone of this model.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clone(): any;
}

export interface SerializableInterface {
  /**
   * JSON casting of this object calls this method.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): any;
}

export type IndexPropertyKey = 'uniqueKeys' | 'indexes' | 'fulltextIndexes' | 'spatialIndexes';
export type IndexPropertyValue = Array<
  | UniqueKeyModelInterface
  | IndexModelInterface
  | FulltextIndexModelInterface
  | SpatialIndexModelInterface
>;

export interface DatabaseInterface {
  ddsCollection: P_DDS[];
}

export interface DatabaseModelInterface extends DatabaseInterface {
  tables: TableModelInterface[];
  getTables(): TableModelInterface[];
  setTables(tables: TableModelInterface[]): void;
  getTable(name: string): TableModelInterface | null;
  pushTable(table: TableModelInterface): void;
}

export interface TableModelInterface
  extends TableInterface,
    ClonableInterface,
    SerializableInterface {
  name: string;
  database: DatabaseModelInterface;
  columns?: ColumnModelInterface[];
  options?: TableOptionsModelInterface;
  fulltextIndexes?: FulltextIndexModelInterface[];
  spatialIndexes?: SpatialIndexModelInterface[];
  foreignKeys?: ForeignKeyModelInterface[];
  uniqueKeys?: UniqueKeyModelInterface[];
  indexes?: IndexModelInterface[];
  primaryKey?: PrimaryKeyModelInterface;
  getTable(name: string): TableModelInterface | null;
  getTables(): TableModelInterface[];
  setDatabase(database: DatabaseModelInterface): void;
  renameTo(newName: string): void;
  addColumn(column: ColumnModelInterface, position?: O_POSITION): void;
  extractColumnKeys(column: ColumnModelInterface): void;
  moveColumn(column: ColumnModelInterface, position: O_POSITION): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): boolean;
  getColumnPosition(column: ColumnModelInterface): O_POSITION | null;
  dropPrimaryKey(): void;
  dropColumn(column: ColumnModelInterface): void;
  dropIndex(
    index:
      | UniqueKeyModelInterface
      | IndexModelInterface
      | FulltextIndexModelInterface
      | SpatialIndexModelInterface,
  ): void;
  dropForeignKey(foreignKey: ForeignKeyModelInterface): void;
  getIndex(
    name: string,
  ):
    | UniqueKeyModelInterface
    | IndexModelInterface
    | FulltextIndexModelInterface
    | SpatialIndexModelInterface
    | null;
  getIndexType(name: string): IndexPropertyKey | null;
  getColumn(name: string): ColumnModelInterface | undefined;
  getForeignKey(name: string): ForeignKeyModelInterface | undefined;
  hasForeignKey(name: string): boolean;
  setPrimaryKey(primaryKey: PrimaryKeyModelInterface): void;
  pushFulltextIndex(fulltextIndex: FulltextIndexModelInterface): void;
  pushSpatialIndex(spatialIndex: SpatialIndexModelInterface): void;
  pushUniqueKey(uniqueKey: UniqueKeyModelInterface): void;
  pushForeignKey(foreignKey: ForeignKeyModelInterface): void;
  pushIndex(index: IndexModelInterface): void;
}

export interface ColumnModelInterface
  extends ColumnInterface,
    ClonableInterface,
    SerializableInterface {
  type: DatatypeModelInterface;
  reference?: ColumnReferenceModelInterface;
  options?: ColumnOptionsModelInterface;
  isPrimaryKey(): boolean;
  isUniqueKey(): boolean;
  isForeignKey(): boolean;
  extractPrimaryKey(): PrimaryKeyModelInterface | null;
  extractForeignKey(): ForeignKeyModelInterface | null;
  extractUniqueKey(): UniqueKeyModelInterface | null;
}

export interface TableOptionsModelInterface
  extends TableOptionsInterface,
    ClonableInterface,
    SerializableInterface {
  mergeWith(options: TableOptionsInterface): void;
}

export interface FulltextIndexModelInterface
  extends FulltextIndexInterface,
    ClonableInterface,
    SerializableInterface {
  columns: IndexColumnModelInterface[];
  options?: IndexOptionsModelInterface;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): void;
}

export interface SpatialIndexModelInterface
  extends SpatialIndexInterface,
    ClonableInterface,
    SerializableInterface {
  columns: IndexColumnModelInterface[];
  options?: IndexOptionsModelInterface;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): void;
}

export interface ForeignKeyModelInterface
  extends ForeignKeyInterface,
    ClonableInterface,
    SerializableInterface {
  columns: IndexColumnModelInterface[];
  reference: ColumnReferenceModelInterface;
  pushColumn(indexColumn: IndexColumnModelInterface): void;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  setIndexSizeFromTable(table: TableModelInterface): void;
  hasAllColumnsFromRefTable(table: TableModelInterface): boolean;
  getReferencedTable(tables: TableModelInterface[]): TableModelInterface | undefined;
  referencesTableAndColumn(table: TableModelInterface, column: ColumnModelInterface): boolean;
  referencesTable(table: TableModelInterface): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): void;
  updateReferencedTableName(newName: string): void;
}

export interface UniqueKeyModelInterface
  extends UniqueKeyInterface,
    ClonableInterface,
    SerializableInterface {
  columns: IndexColumnModelInterface[];
  options?: IndexOptionsModelInterface;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  setIndexSizeFromTable(table: TableModelInterface): void;
  renameColumn(column: ColumnModelInterface, newName: string): void;
}

export interface IndexModelInterface
  extends IndexInterface,
    ClonableInterface,
    SerializableInterface {
  columns: IndexColumnModelInterface[];
  options?: IndexOptionsModelInterface;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  setIndexSizeFromTable(table: TableModelInterface): void;
  renameColumn(column: ColumnModelInterface, newName: string): void;
}

export interface PrimaryKeyModelInterface
  extends PrimaryKeyInterface,
    ClonableInterface,
    SerializableInterface {
  columns?: IndexColumnModelInterface[];
  options?: IndexOptionsModelInterface;
  pushColumn(indexColumn: IndexColumnModelInterface): void;
  dropColumn(name: string): boolean;
  getColumnsFromTable(table: TableModelInterface): ColumnModelInterface[];
  hasAllColumnsFromTable(table: TableModelInterface): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): void;
}

export interface DatatypeModelInterface
  extends DatatypeInterface,
    ClonableInterface,
    SerializableInterface {
  getMaxIndexableSize(): number;
}

export interface ColumnReferenceModelInterface
  extends ColumnReferenceInterface,
    ClonableInterface,
    SerializableInterface {
  columns?: IndexColumnModelInterface[];
  on?: ColumnReferenceOnModelInterface[];
}

export interface ColumnOptionsModelInterface
  extends ColumnOptionsInterface,
    ClonableInterface,
    SerializableInterface {}

export interface IndexColumnModelInterface
  extends IndexColumnInterface,
    ClonableInterface,
    SerializableInterface {}

export interface ColumnReferenceOnModelInterface
  extends ColumnReferenceOnInterface,
    ClonableInterface,
    SerializableInterface {}

export interface IndexOptionsModelInterface
  extends IndexOptionsInterface,
    ClonableInterface,
    SerializableInterface {}

export interface RuleHandler {
  database: DatabaseModelInterface;
  getTable(name: string): TableModelInterface | null;
  setDatabase(database: DatabaseModelInterface): void;
  handleDef(json: STATEMENT): void;
}
