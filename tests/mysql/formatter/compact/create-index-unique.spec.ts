import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

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
  },

  'Compact formatter: Should not create unique index for unknown column.': {
    queries: [sql.concat(['CREATE UNIQUE INDEX f_abcxyz on person (abcxyz);']).join('')],
  },
});
