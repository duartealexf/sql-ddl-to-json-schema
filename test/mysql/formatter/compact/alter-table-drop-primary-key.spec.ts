import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-drop-primary-key.json');

const sql = [createTable, 'ALTER TABLE house DROP PRIMARY KEY;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping primary key.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not drop primary key containing an autoincrement column.': {
    queries: [sql.concat(['ALTER TABLE person DROP PRIMARY KEY;']).join('')],
    expect,
  },
});
