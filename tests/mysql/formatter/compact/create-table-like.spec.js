const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'create-table-like.json');

const sql = [
  createTable,
  'CREATE TABLE dog LIKE pet;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should create one table like another one.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
