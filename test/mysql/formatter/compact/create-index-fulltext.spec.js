const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'create-index-fulltext.json');

const sql = [
  createTable,
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should create fulltext index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not create fulltext index for unknown column.': {
    queries: [
      sql.concat([
        'CREATE FULLTEXT INDEX f_abcxyz on person (abcxyz);'
      ]).join('')
    ],
    expect,
  },
});
