const Column = require('./column');

const { JSONSchemaFormatOptions } = require('../../../../shared/options');
const utils = require('../../../../shared/utils');

/**
 * Class to represent a table as parsed from compact format.
 */
class Table {

  /**
   * Create Table instance from compact JSON format.
   *
   * @param {any} json Table in compact JSON format.
   * @returns {Table} Built table instance.
   */
  static fromCompactJson(json) {
    const table = new Table();

    table.columns = json.columns.map(c => Column.fromCompactJson(c));
    table.name = json.name;

    if (utils.isDefined(json.primaryKey)) {
      /**
       * Set property in column(s) that is/are primary key(s).
       */
      json.primaryKey.columns
        .map(c => c.column)
        .map(name => table.columns.find(c => c.name === name))
        .filter(column => !!column)
        .forEach(column => {
          column.isPrimaryKey = true;
        });
    }

    const options = json.options;
    if (options) {
      if (utils.isDefined(options.comment)) {
        table.comment = options.comment;
      }
    }

    return table;
  }

  /**
   * Table constructor.
   */
  constructor() {

    /**
     * Table columns.
     * @type {Column[]}
     */
    this.columns = [];

    /**
     * Table name.
     * @type {string}
     */
    this.name = undefined;

    /**
     * Table comment.
     * @type {string}
     */
    this.comment = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   * @param {JSONSchemaFormatOptions} options Options available to format as JSON Schema.
   * @returns {any} JSON Schema document.
   */
  toJSON(options = new JSONSchemaFormatOptions()) {
    const json = {
      $schema: 'http://json-schema.org/draft-07/schema',
      $comment: `JSON Schema for ${this.name} table`,
      $id: this.name,
      title: this.name,
    };

    if (utils.isDefined(this.comment)) {
      json.description = this.comment;
    }

    json.type = 'object';
    json.required = [];
    json.definitions = {};
    json.properties = {};

    this.columns.forEach(c => {
      const column = c.toJSON();
      const name = c.name;
      const definitions = {};

      json.properties[name] = {
        $ref: `#/definitions/${name}`,
      };

      Object.getOwnPropertyNames(column)
        .map(k => [k, column[k]])
        .forEach(([k, v]) => { definitions[k] = v; });

      json.definitions[name] = definitions;

      if (c.isNullable === false) {
        json.required.push(name);
      }
    });

    /**
     * Option to not use $ref, and have properties flattened out to 'properties' node.
     * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/36
     */
    if (options.useRef === false) {
      json.properties = json.definitions;
      delete json.definitions;
    }

    return json;
  }
}

module.exports = Table;
