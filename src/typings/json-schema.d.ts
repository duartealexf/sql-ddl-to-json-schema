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
