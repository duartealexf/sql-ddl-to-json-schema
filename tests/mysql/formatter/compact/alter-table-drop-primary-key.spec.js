const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-drop-primary-key.json');

const sql = [
  createTable,
  'ALTER TABLE house DROP PRIMARY KEY;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, dropping primary key.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not drop primary key containing an autoincrement column.': {
    queries: [
      sql.concat([
        'ALTER TABLE person DROP PRIMARY KEY;'
      ]).join('')
    ],
    expect,
  },
});
