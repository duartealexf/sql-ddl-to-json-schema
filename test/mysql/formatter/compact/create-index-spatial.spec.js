const { join } = require('path');

const runner = require('../../runner');
const createTable = require('./sql/create-table');
const parseHandler = require('../../parse-handler');

const expect = join(__dirname, 'expect', 'create-index-spatial.json');

const sql = [
  createTable,
  `
    CREATE SPATIAL INDEX si_name
    using rtree
    on person (name(20) asc)
    key_block_size 4096
    using rtree
    with parser initialsParser
    comment 'unique initials'
    algorithm default
    lock none;
  `
];

runner.run(parseHandler.getCompactFormat, {
  'Compact formatter: Should create spatial index.': {
    queries: [
      sql.join('')
    ],
    expect,
  },

  'Compact formatter: Should not create spatial index for unknown column.': {
    queries: [
      sql.concat([
        'CREATE SPATIAL INDEX f_abcxyz on person (abcxyz);'
      ]).join('')
    ],
    expect,
  },
});
