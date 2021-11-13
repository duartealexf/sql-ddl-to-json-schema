import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

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
  `,
];

run(getCompactFormat, {
  'Compact formatter: Should create spatial index.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Should not create spatial index for unknown column.': {
    queries: [sql.concat(['CREATE SPATIAL INDEX f_abcxyz on person (abcxyz);']).join('')],
  },
});
