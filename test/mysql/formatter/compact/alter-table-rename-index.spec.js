const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-rename-index.json');

const sql = [
  createTable,
  'ALTER TABLE person RENAME INDEX u_motto TO unq_motto;',
  'ALTER TABLE person RENAME KEY fi_initials TO fidx_initials;',
  'ALTER TABLE pet RENAME INDEX i_dimensions TO idx_dimensions;',
  'ALTER TABLE house RENAME INDEX coords TO placement;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, renaming index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not rename unexisting index.': {
    queries: [
      sql.concat([
        'ALTER TABLE house RENAME INDEX xyz TO abc;'
      ]).join('')
    ],
    expect,
  },
});
