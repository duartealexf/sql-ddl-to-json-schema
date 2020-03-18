import { P_DDS, O_POSITION, STATEMENT } from '@mysql/compiled/typings';

export interface ClonableInterface {
  /**
   * Create a clone of this model.
   */
  clone(): any;
}

export interface SerializableInterface {
  /**
   * JSON casting of this object calls this method.
   */
  toJSON(): any;
}

export interface DatabaseInterface {
  ddsCollection: P_DDS[];
}

export interface TableInterface {
  name: string;
  database?: DatabaseInterface;
  columns?: ColumnInterface[];
  options?: TableOptionsInterface;
  fulltextIndexes?: FulltextIndexInterface[];
  spatialIndexes?: SpatialIndexInterface[];
  foreignKeys?: ForeignKeyInterface[];
  uniqueKeys?: UniqueKeyInterface[];
  indexes?: IndexInterface[];
  primaryKey?: PrimaryKeyInterface;
}

export interface ColumnInterface {
  name: string;
  type: DatatypeInterface;
  reference?: ColumnReferenceInterface;
  options?: ColumnOptionsInterface;
}

export interface TableOptionsInterface {
  autoincrement?: number;
  avgRowLength?: number;
  charset?: string;
  checksum?: number;
  collation?: string;
  comment?: string;
  compression?: string;
  connection?: string;
  dataDirectory?: string;
  indexDirectory?: string;
  delayKeyWrite?: number;
  encryption?: string;
  encryptionKeyId?: number;
  ietfQuotes?: string;
  engine?: string;
  insertMethod?: string;
  keyBlockSize?: number;
  maxRows?: number;
  minRows?: number;
  packKeys?: number | string;
  pageChecksum?: number;
  password?: string;
  rowFormat?: string;
  statsAutoRecalc?: number | string;
  statsPersistent?: number | string;
  statsSamplePages?: number | string;
  transactional?: number;
  withSystemVersioning?: boolean;
  tablespaceName?: string;
  tablespaceStorage?: string;
  union?: string[];
}

export interface FulltextIndexInterface {
  name?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface SpatialIndexInterface {
  name?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface ForeignKeyInterface {
  name?: string;
  columns: IndexColumnInterface[];
  reference: ColumnReferenceInterface;
}

export interface UniqueKeyInterface {
  name?: string;
  indexType?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface IndexInterface {
  name?: string;
  indexType?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface PrimaryKeyInterface {
  name?: string; // TODO: primary key name did not exist before. check this when testing.
  indexType?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface DatatypeInterface {
  datatype: string;
  /**
   * Width for integer datatypes.
   */
  width?: number;
  /**
   * Digits for numeric non-integer and year datatypes.
   */
  digits?: number;
  /**
   * Decimals for numeric non-integer datatypes.
   */
  decimals?: number;
  /**
   * Length of bit, blob, binary and string datatypes.
   */
  length?: number;
  /**
   * Number of fractionals for datetime datatypes.
   */
  fractional?: number;
  /**
   * Values for enum and set datatypes.
   */
  values?: string[];
}

export interface ColumnReferenceInterface {
  table: string;
  match?: string;
  columns?: IndexColumnInterface[];
  on?: ColumnReferenceOnInterface[];
}

export interface ColumnOptionsInterface {
  unsigned?: boolean;
  zerofill?: boolean;
  charset?: string;
  collation?: string;
  nullable?: boolean;
  default?: boolean | string | number | null;
  autoincrement?: boolean;
  unique?: boolean;
  primary?: boolean;
  comment?: string;
  invisibleWithSystemVersioning?: boolean;
  invisibleWithoutSystemVersioning?: boolean;
  invisible?: boolean;
  format?: string;
  storage?: string;
  onUpdate?: string;
}

export interface IndexColumnInterface {
  column?: string;
  length?: number;
  sort?: string;
}

export interface ColumnReferenceOnInterface {
  trigger: string;
  action: string;
}

export interface IndexOptionsInterface {
  keyBlockSize?: number;
  indexType?: string;
  parser?: string;
  comment?: string;
  algorithm?: string;
  lock?: string;
}

export interface DatabaseModelInterface extends DatabaseInterface {
  tables: TableModelInterface[];
  getTables(): TableModelInterface[];
  setTables(tables: TableModelInterface[]): void;
  getTable(name: string): TableModelInterface | undefined;
  pushTable(table: TableModelInterface): void;
}

export interface TableModelInterface
  extends TableInterface,
    ClonableInterface,
    SerializableInterface {
  database: DatabaseModelInterface;
  columns?: ColumnModelInterface[];
  options?: TableOptionsModelInterface;
  fulltextIndexes?: FulltextIndexModelInterface[];
  spatialIndexes?: SpatialIndexModelInterface[];
  foreignKeys?: ForeignKeyModelInterface[];
  uniqueKeys?: UniqueKeyModelInterface[];
  indexes?: IndexModelInterface[];
  primaryKey?: PrimaryKeyModelInterface;
  getTable(name: string): TableModelInterface | undefined;
  getTables(): TableModelInterface[];
  setDatabase(database: DatabaseModelInterface): void;
  renameTo(newName: string): void;
  addColumn(column: ColumnModelInterface, position?: O_POSITION): void;
  extractColumnKeys(column: ColumnModelInterface): void;
  moveColumn(column: ColumnModelInterface, position: O_POSITION): boolean;
  renameColumn(column: ColumnModelInterface, newName: string): boolean;
  getColumnPosition(column: ColumnModelInterface): O_POSITION;
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
    | undefined;
  getIndexType(name: string): string | undefined;
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
  extractPrimaryKey(): PrimaryKeyModelInterface | undefined;
  extractForeignKey(): ForeignKeyModelInterface | undefined;
  extractUniqueKey(): UniqueKeyModelInterface | undefined;
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
  columns: IndexColumnModelInterface[];
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
  getMaxIndexableSize(): number | undefined;
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
  getTable(name: string): TableModelInterface | undefined;
  setDatabase(database: DatabaseModelInterface): void;
  handleDef(json: STATEMENT): void;
}
