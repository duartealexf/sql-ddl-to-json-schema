const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'drop-index-fulltext.json');

const sql = [
  createTable,
  'DROP INDEX fi_initials ON person ALGORITHM default LOCK none;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should drop a fulltext index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not drop unknown index.': {
    queries: [
      sql.concat([
        'DROP INDEX fi_xyzabc ON person;'
      ]).join('')
    ],
    expect,
  },
});
