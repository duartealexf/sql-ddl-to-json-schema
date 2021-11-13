/* eslint-disable import/no-extraneous-dependencies */

import { Parser } from '../..';
import { JSONSchemaFormatOptions } from '../../typings/typings/json-schema';

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser,
 * to be compared to expected value.
 */
export const getParsedFormat = (query: string): unknown => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.results;
};

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser in compact format,
 * to be compared to expected value.
 */
export const getCompactFormat = (query: string): unknown => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.toCompactJson();
};

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser in JSON Schema format,
 * to be compared to expected value.
 */
export const getJSONSchemaFormat = (query: string, options: JSONSchemaFormatOptions): unknown[] => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.toJsonSchemaArray(options);
};
