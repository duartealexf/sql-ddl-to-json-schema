import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'create-index-fulltext.json');

const sql = [
  createTable,
  `
    CREATE FULLTEXT INDEX fi_name
    using rtree
    on person (name(20) asc)
    key_block_size 4096
    using rtree
    with parser initialsParser
    algorithm default
    lock none;
  `,
];

run(getCompactFormat, {
  'Compact formatter: Should create fulltext index.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not create fulltext index for unknown column.': {
    queries: [sql.concat(['CREATE FULLTEXT INDEX f_abcxyz on person (abcxyz);']).join('')],
    expect,
  },
});
