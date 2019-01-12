const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-add-columns.json');

const sql = [
  createTable,
  `ALTER TABLE person ADD COLUMN (
    test1 TINYINT UNSIGNED ZEROFILL CHARACTER SET latin1 COLLATE latin_ci NULL DEFAULT 42 AUTO_INCREMENT UNIQUE INVISIBLE WITHOUT SYSTEM VERSIONING,
    test2 BOOLEAN NOT NULL COMMENT "staying alive" INVISIBLE WITH SYSTEM VERSIONING COLUMN_FORMAT DYNAMIC,
    test3 TINYBLOB INVISIBLE STORAGE MEMORY REFERENCES dog (avatar),
    test3 JSON COMMENT "duplicate, should not be added"
  );`
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, adding columns.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add columns should not add autoincrement without being a primary key.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet ADD COLUMN xyzabc INT(11) AUTO_INCREMENT;',
      ]).join('')
    ],
    expect,
  },
});
