const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-drop-index.json');

const sql = [
  createTable,
  'ALTER TABLE house DROP INDEX primary;',
  'ALTER TABLE person DROP INDEX u_motto;',
  'ALTER TABLE person DROP INDEX fi_initials;',
  'ALTER TABLE pet DROP INDEX i_dimensions;',
  'ALTER TABLE house DROP KEY coords;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, dropping index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
