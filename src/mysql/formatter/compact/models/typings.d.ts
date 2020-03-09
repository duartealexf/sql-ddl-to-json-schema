import { P_DDS } from '@mysql/compiled/typings';

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
  tables: TableInterface[];
  getTables(): TableInterface[];
  setTables(tables: TableInterface[]): void;
  getTable(name: string): TableInterface | undefined;
  pushTable(table: TableInterface): void;
}

export interface TableInterface {
  database: DatabaseInterface;
  name: string;
  columns: ColumnInterface[];
  options: TableOptionsInterface;
  fulltextIndexes: FulltextIndexInterface[];
  spatialIndexes: SpatialIndexInterface[];
  foreignKeys: ForeignKeyInterface[];
  uniqueKeys: UniqueKeyInterface[];
  indexes: IndexInterface[];
  primaryKey: PrimaryKeyInterface;
}

export interface ColumnInterface {
  name: string;
  type: DatatypeInterface;
  reference?: ColumnReferenceInterface;
  options?: ColumnOptionsInterface;
}

export interface TableOptionsInterface {
  autoincrement: number;
  avgRowLength: number;
  charset: string;
  checksum: number;
  collation: string;
  comment: string;
  compression: string;
  connection: string;
  dataDirectory: string;
  indexDirectory: string;
  delayKeyWrite: number;
  encryption: string;
  encryptionKeyId: number;
  ietfQuotes: string;
  engine: string;
  insertMethod: string;
  keyBlockSize: number;
  maxRows: number;
  minRows: number;
  packKeys: number | string;
  pageChecksum: number;
  password: string;
  rowFormat: string;
  statsAutoRecalc: number | string;
  statsPersistent: number | string;
  statsSamplePages: number | string;
  transactional: number;
  withSystemVersioning: boolean;
  tablespaceName: string;
  tablespaceStorage: string;
  union: string[];
}

export interface FulltextIndexInterface {
  name: string;
  columns: IndexColumnInterface[];
  options: IndexOptionsInterface;
}

export interface SpatialIndexInterface {
  name: string;
  columns: IndexColumnInterface[];
  options: IndexOptionsInterface;
}

export interface ForeignKeyInterface {
  name: string;
  columns: IndexColumnInterface[];
  reference: ColumnReferenceInterface;
}

export interface UniqueKeyInterface {
  name: string;
  indexType: string;
  columns: IndexColumnInterface[];
  options: IndexOptionsInterface;
}

export interface IndexInterface {
  name: string;
  indexType: string;
  columns: IndexColumnInterface[];
  options: IndexOptionsInterface;
}

export interface PrimaryKeyInterface {
  name?: string; // TODO: primary key name did not exist before. check this when testing.
  indexType?: string;
  columns: IndexColumnInterface[];
  options?: IndexOptionsInterface;
}

export interface DatatypeInterface extends ClonableInterface, SerializableInterface {
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

export interface ColumnReferenceInterface extends ClonableInterface, SerializableInterface {
  table: string;
  columns?: IndexColumnInterface[];
  match?: string;
  on?: ColumnReferenceOnInterface[];
}

export interface ColumnOptionsInterface extends ClonableInterface, SerializableInterface {
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
  column: string;
  length: number;
  sort: string;
}

export interface ColumnReferenceOnInterface extends ClonableInterface, SerializableInterface {
  trigger: string;
  action: string;
}

export interface IndexOptionsInterface {
  keyBlockSize: number;
  indexType: string;
  parser: string;
  comment: string;
  algorithm: string;
  lock: string;
}




// TODO: create handler with setDatabase and handleDef (for rules)
