const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'drop-table-single.json');

const sql = [
  createTable,
  'DROP TABLE house;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should drop a table.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not drop table being referenced by foreign keys.': {
    queries: [
      sql.concat([
        'DROP TABLE person;'
      ]).join('')
    ],
    expect,
  },
});
