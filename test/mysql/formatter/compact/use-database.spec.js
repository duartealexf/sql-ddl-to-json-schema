const { join } = require('path');

const runner = require('../../runner');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'use-database.json');

const sql = [
  'USE dbname;',
  'USE `dbname`;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should use database.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
