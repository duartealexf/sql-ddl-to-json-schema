import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-set-default-col-value.json');

const sql = [
  createTable,
  'ALTER TABLE person ALTER COLUMN status SET DEFAULT 0;',
  'ALTER TABLE person ALTER nickname SET DEFAULT "JJ";',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, renaming it.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not set default value for unknown column.': {
    queries: [sql.concat(['ALTER TABLE person ALTER xyzabc SET DEFAULT "JJ";']).join('')],
    expect,
  },
});
