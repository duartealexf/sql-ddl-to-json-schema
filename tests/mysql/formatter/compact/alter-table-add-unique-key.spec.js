const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-add-unique-key.json');


const sql = [
  createTable,
  'ALTER TABLE pet ADD CONSTRAINT uq_birth UNIQUE KEY unique_birth (birth(12) desc, status(1)) KEY_BLOCK_SIZE 64 USING BTREE WITH PARSER uniqueParser COMMENT "unique formatter test";',
  'ALTER TABLE pet ADD CONSTRAINT UNIQUE INDEX (history);',
  'ALTER TABLE pet ADD UNIQUE KEY INDEX (shape);',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, adding unique key.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add unique key should not add key or index with same name.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet ADD CONSTRAINT uq_birth UNIQUE KEY (birth);',
      ]).join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add unique key should not add key or index with for unknown table column.': {
    queries: [
      sql.concat([
        'ALTER TABLE pet ADD CONSTRAINT abcxyz UNIQUE KEY (abcxyz);',
      ]).join('')
    ],
    expect,
  },
});
