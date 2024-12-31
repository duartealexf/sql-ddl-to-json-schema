/* eslint-disable no-unused-expressions */

import { Parser } from '../../../..';

describe('readme-table-user: test readme table user sql', () => {
  const sqlUserDdl = `
    CREATE TABLE users (
      id INT(11) NOT NULL AUTO_INCREMENT,
      nickname VARCHAR(255) NOT NULL,
      deleted_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE MyISAM COMMENT 'All system users';

    ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
  `;

  it('should be equal to the new maximum 2147483647', () => {
    const parser = new Parser('mysql');

    parser.feed(sqlUserDdl);

    const arr = parser.toCompactJson(parser.results);
    const schema = parser.toJsonSchemaArray({ useRef: true }, arr).shift();

    // @ts-ignore
    expect(schema.definitions.id.maximum).toEqual(2147483647);
  });
});
