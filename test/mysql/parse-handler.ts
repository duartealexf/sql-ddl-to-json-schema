// eslint-disable-next-line import/no-unresolved
import Parser from 'sql-ddl-to-json-schema';
import { JSONSchema7 } from 'json-schema';
import { P_MAIN, TableInterface } from '../../typings/typings';
import { ParseHandler } from './typings';

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser,
 * to be compared to expected value.
 *
 * @param query Query to be parsed.
 */
export const getParsedFormat: ParseHandler<P_MAIN> = (query: string): P_MAIN => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.results;
};

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser in compact format,
 * to be compared to expected value.
 *
 * @param query Query to be parsed.
 */
export const getCompactFormat: ParseHandler<TableInterface[]> = (
  query: string,
): TableInterface[] => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.toCompactJson();
};

/**
 * Function that will be called back by test runner, which
 * delivers the results from the parser in JSON Schema format,
 * to be compared to expected value.
 *
 * @param query Query to be parsed.
 */
export const getJSONSchemaFormat: ParseHandler<JSONSchema7[]> = (
  query: string,
  useRef: boolean,
): JSONSchema7[] => {
  const parser = new Parser('mysql');
  parser.feed(query);
  return parser.toJsonSchemaArray({ useRef });
};
