export type TransformerFunction<T> = (s: string) => T;
export type StringMap = { [k: string]: string };
export type AnyMap = { [k: string]: any };
export type TMap<T> = { [k: string]: T };
export type Tuple<T> = [keyof T, T[keyof T]];

/**
 * Options available to format as JSON Schema.
 */
export interface JSONSchemaFormatOptions {
  /**
   * Whether to add all properties to 'definitions' and in 'properties' only use $ref.
   * @default true
   */
  useRef: boolean;
}

/**
 * Options for JSON Schema output to files.
 */
export interface JSONSchemaFileOptions {
  /**
   * Whether to add all properties to 'definitions' and in 'properties' only use $ref.
   * @default true
   */
  useRef: boolean;

  /**
   * Indent size of output files.
   * @default 2
   */
  indent: number;

  /**
   * Extension of output files.
   * @default '.json'
   */
  extension: string;
}
