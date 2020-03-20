import { JSONSchema7 } from 'json-schema';

import { TableInterface } from './compact';

export type JSONSchemaFormatter = (
  json: TableInterface[],
  options: JSONSchemaFormatOptions,
) => JSONSchema7[];

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
