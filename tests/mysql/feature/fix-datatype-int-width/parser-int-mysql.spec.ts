/* eslint-disable no-unused-expressions */

import { Parser } from '../../../..';

describe('parser-int-mysql: Parser datatype int max and min number with signed or unsigned', () => {
  it('mysql int signed min should be -2147483648, and max should be 2147483647', () => {
    const sql = `
      CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        num INT(11) COMMENT 'test signed number',
        PRIMARY KEY (id)
      ) ENGINE MyISAM COMMENT 'All system users';
    `;
    const parser = new Parser('mysql');

    parser.feed(sql);

    const arr = parser.toCompactJson(parser.results);
    const schema = parser.toJsonSchemaArray({ useRef: false }, arr).shift();

    // @ts-ignore
    expect(schema.properties.num.minimum).toBe(-2147483648);
    // @ts-ignore
    expect(schema.properties.num.maximum).toBe(2147483647);
  });

  it('mysql int unsigned min should be 0, and max should be 4294967295', () => {
    const sql = `
      CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        num INT(11) UNSIGNED COMMENT 'test unsigned number',
        PRIMARY KEY (id)
      ) ENGINE MyISAM COMMENT 'All system users';
    `;
    const parser = new Parser('mysql');

    parser.feed(sql);

    const arr = parser.toCompactJson(parser.results);
    const schema = parser.toJsonSchemaArray({ useRef: false }, arr).shift();

    // @ts-ignore
    expect(schema.properties.num.minimum).toBe(0);
    // @ts-ignore
    expect(schema.properties.num.maximum).toBe(4294967295);
  });
});
