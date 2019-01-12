const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-set-default-col-value.json');

const sql = [
  createTable,
  'ALTER TABLE person ALTER COLUMN status SET DEFAULT 0;',
  'ALTER TABLE person ALTER nickname SET DEFAULT "JJ";',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, renaming it.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not set default value for unknown column.': {
    queries: [
      sql.concat([
        'ALTER TABLE person ALTER xyzabc SET DEFAULT "JJ";'
      ]).join('')
    ],
    expect,
  },
});
