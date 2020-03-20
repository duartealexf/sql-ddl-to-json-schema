import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-add-column.json');

const sql = [
  createTable,
  'ALTER TABLE person ADD COLUMN test1 TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING FIRST;',
  'ALTER TABLE person ADD COLUMN test2 BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC AFTER sequence;',
  'ALTER TABLE person ADD COLUMN test3 TINYBLOB CHARSET utf8 INVISIBLE STORAGE MEMORY REFERENCES dog (avatar);',
  'ALTER TABLE person ADD COLUMN test3 JSON COMMENT "duplicate, should not be added";',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding columns in different positions.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Alter table add column should not add a column with autoincrement if there is another one with autoincrement in table.': {
    queries: [sql.concat(['ALTER TABLE person ADD COLUMN id2 int(8) AUTO_INCREMENT;']).join('')],
    expect,
  },
});
