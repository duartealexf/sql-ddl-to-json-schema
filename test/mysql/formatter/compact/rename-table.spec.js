const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'rename-table.json');

const sql = [
  createTable,
  'ALTER TABLE person RENAME TO people;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Compact formatter: Should rename table.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
