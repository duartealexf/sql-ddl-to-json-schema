export interface ColumnInterface {
  /**
   * Column name.
   */
  name?: string;

  /**
   * Column data type.
   */
  datatype?: Datatype;

  /**
   * Whether column is nullable.
   */
  isNullable?: boolean;

  /**
   * Whether column is primary key.
   */
  isPrimaryKey?: boolean;

  /**
   * Column comment.
   */
  comment?: string;

  /**
   * Column default value.
   */
  default?: boolean | string | number | null;
}
