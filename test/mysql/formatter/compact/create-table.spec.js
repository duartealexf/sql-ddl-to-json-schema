const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'create-table.json');

const sql = [
  createTable,
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should create 3 tables with all datatypes, options and definitions.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
