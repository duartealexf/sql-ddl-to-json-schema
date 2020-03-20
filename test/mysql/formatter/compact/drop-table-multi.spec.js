const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'drop-table-multi.json');

const sql = [
  createTable,
  'DROP TABLE house, pet;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should drop two tables.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
