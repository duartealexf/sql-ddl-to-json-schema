const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'drop-index-spatial.json');

const sql = [
  createTable,
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should drop a spatial index.': {
    queries: [
      sql.join('DROP INDEX coords ON house ALGORITHM default LOCK none;')
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
