import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-rename-table.json');

const sql = [createTable, 'ALTER TABLE person RENAME TO people;', 'ALTER TABLE pet RENAME AS dog;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, renaming it.': {
    queries: [sql.join('')],
    expect,
  },
});
