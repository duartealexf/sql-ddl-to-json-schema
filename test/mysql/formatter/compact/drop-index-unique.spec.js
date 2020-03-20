const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'drop-index-unique.json');

const sql = [
  createTable,
  'DROP INDEX u_motto ON person ALGORITHM default LOCK none;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should drop a unique index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
