/**
 * Options available to format as JSON Schema.
 */
class JSONSchemaFormatOptions {
  /**
   * Options constructor.
   */
  constructor() {
    /**
     * Whether to add all properties to 'definitions' and in 'properties' only use $ref.
     * Default value: true.
     * @type {boolean}
     */
    this.useRef = true;
  }
}

/**
 * Options for JSON Schema output to files.
 */
class JSONSchemaFileOptions {

  /**
   * Options constructor.
   */
  constructor() {
    /**
     * Whether to add all properties to 'definitions' and in 'properties' only use $ref.
     * Default value: `true`.
     * @type {boolean}
     */
    this.useRef = true;

    /**
     * Indent size of output files.
     * Default value: `2`.
     * @type {number}
     */
    this.indent = 2;

    /**
     * Extension of output files.
     * Default value: `'.json'`.
     * @type {string}
     */
    this.extension = '.json';
  }
}

module.exports = {
  JSONSchemaFormatOptions,
  JSONSchemaFileOptions
};
