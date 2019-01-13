const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-add-index.json');

const sql = [
  createTable,
  'ALTER TABLE house ADD INDEX idx_built (is_built asc, is_apartment (2)) KEY_BLOCK_SIZE = 16 USING BTREE WITH PARSER myParser COMMENT "formatter test";',
  'ALTER TABLE house ADD INDEX idx_letter (letter asc);',
  'ALTER TABLE house ADD KEY (where);',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, adding index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add index should not add key or index with same name.': {
    queries: [
      sql.concat([
        'ALTER TABLE house ADD INDEX idx_built (is_built);',
      ]).join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add index should not add key or index for unexisting table.': {
    queries: [
      sql.concat([
        'ALTER TABLE abcxyz ADD INDEX idx_built (is_built);',
      ]).join('')
    ],
    expect,
  },

  'Compact formatter: Alter table add index should not add key or index for unexisting table column.': {
    queries: [
      sql.concat([
        'ALTER TABLE house ADD INDEX idx_built (abcxyz);',
      ]).join('')
    ],
    expect,
  },
});

