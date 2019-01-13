const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'alter-table-drop-foreign-key.json');

const sql = [
  createTable,
  'ALTER TABLE house DROP FOREIGN KEY fk_pet_id;',
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should alter table, dropping foreign key.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not drop unknown foreign key.': {
    queries: [
      sql.concat([
        'ALTER TABLE house DROP FOREIGN KEY fk_pet_id;'
      ]).join('')
    ],
    expect,
  },
});
