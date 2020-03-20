import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-add-spatial-index.json');

const sql = [
  createTable,
  'ALTER TABLE person ADD SPATIAL INDEX si_pattern (pattern(21) asc, shape(10)) KEY_BLOCK_SIZE 2048 USING HASH WITH PARSER spatialParser COMMENT "spatial formatter test";',
  'ALTER TABLE pet ADD SPATIAL INDEX (shape);',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding spatial index.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Alter table add spatial index should not add key or index with same name.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE person ADD SPATIAL INDEX si_pattern (pattern);',
          'ALTER TABLE person ADD SPATIAL INDEX abcxyz (abcxyz);',
        ])
        .join(''),
    ],
    expect,
  },
});
