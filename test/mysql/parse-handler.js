const { Parser } = require('sql-ddl-to-json-schema');

module.exports = {
  /**
   * Function that will be called back by test runner, which
   * delivers the results from the parser,
   * to be compared to expected value.
   *
   * @param {string} query Query to be parsed.
   * @returns {any} Parsed result.
   */
  getParsedFormat: query => {
    const parser = new Parser('mysql');
    parser.feed(query);
    return parser.results;
  },

  /**
   * Function that will be called back by test runner, which
   * delivers the results from the parser in compact format,
   * to be compared to expected value.
   *
   * @param {string} query Query to be parsed.
   * @returns {any} Compact format.
   */
  getCompactFormat: query => {
    const parser = new Parser('mysql');
    parser.feed(query);
    return parser.toCompactJson();
  },

  /**
   * Function that will be called back by test runner, which
   * delivers the results from the parser in JSON Schema format,
   * to be compared to expected value.
   *
   * @param {string} query Query to be parsed.
   * @param {import('../../typings/typings/json-schema').JSONSchemaFormatOptions} options Options to be passed to formatter.
   * @returns {any[]} JSON Schema format.
   */
  getJSONSchemaFormat: (query, options) => {
    const parser = new Parser('mysql');
    parser.feed(query);
    return parser.toJsonSchemaArray(undefined, options);
  }
};
