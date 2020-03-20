import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'rename-table.json');

const sql = [createTable, 'ALTER TABLE person RENAME TO people;'];

run(getCompactFormat, {
  'Compact formatter: Compact formatter: Should rename table.': {
    queries: [sql.join('')],
    expect,
  },
});
