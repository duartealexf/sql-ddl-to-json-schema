import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'create-index-unique.json');

const sql = [
  createTable,
  `
    CREATE UNIQUE INDEX u_initials
    using rtree
    on person (name(3) asc)
    key_block_size 4096
    using rtree
    with parser initialsParser
    comment 'unique initials'
    algorithm default
    lock none;
  `,
];

run(getCompactFormat, {
  'Compact formatter: Should create unique index.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not create unique index for unknown column.': {
    queries: [sql.concat(['CREATE UNIQUE INDEX f_abcxyz on person (abcxyz);']).join('')],
    expect,
  },
});
