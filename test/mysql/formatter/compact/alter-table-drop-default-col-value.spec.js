const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-drop-default-col-value.json');

const sql = [
  createTable,
  'ALTER TABLE person ALTER COLUMN nickname DROP DEFAULT;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, dropping default column value.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Alter table drop default column value should not alter unexisting table column.': {
    queries: [
      sql.concat([
        'ALTER TABLE person ALTER COLUMN xyzabc DROP DEFAULT;'
      ]).join('')
    ],
    expect,
  },
});
