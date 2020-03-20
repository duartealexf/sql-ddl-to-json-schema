import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'drop-index-unique.json');

const sql = [createTable, 'DROP INDEX u_motto ON person ALGORITHM default LOCK none;'];

run(getCompactFormat, {
  'Compact formatter: Should drop a unique index.': {
    queries: [sql.join('')],
    expect,
  },
});
