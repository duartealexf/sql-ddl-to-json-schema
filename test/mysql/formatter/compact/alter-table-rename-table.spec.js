const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-rename-table.json');

const sql = [
  createTable,
  'ALTER TABLE person RENAME TO people;',
'ALTER TABLE pet RENAME AS dog;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, renaming it.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
