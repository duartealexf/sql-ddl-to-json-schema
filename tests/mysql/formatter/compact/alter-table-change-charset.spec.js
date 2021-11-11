const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-change-charset.json');

const sql = [
  createTable,
  'ALTER TABLE person DEFAULT CHARACTER SET latin1 COLLATE = latin1_general_ci;',
  'ALTER TABLE pet CHARACTER SET pet_charset;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, changing charset.': {
    queries: [
      sql.join('')
    ],
    expect,
  },
});
