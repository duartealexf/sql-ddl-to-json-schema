import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  `ALTER TABLE person ADD COLUMN (
    test1 BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC,
    test2 TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar)
  );`,
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding columns.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Alter table add columns should not add autoincrement with a table already having autoincrement.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE person ADD COLUMN test3 TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 AUTO_INCREMENT UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING;',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table add columns should not add column with duplicate name.': {
    queries: [
      sql
        .concat(['ALTER TABLE person ADD COLUMN test2 JSON COMMENT "you shall not pass";'])
        .join(''),
    ],
  },

  'Compact formatter: Alter table add columns should not add autoincrement without it being a primary key.': {
    queries: [sql.concat(['ALTER TABLE pet ADD COLUMN xyzabc INT(11) AUTO_INCREMENT;']).join('')],
  },
});
