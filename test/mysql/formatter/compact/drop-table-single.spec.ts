import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'drop-table-single.json');

const sql = [createTable, 'DROP TABLE house;'];

run(getCompactFormat, {
  'Compact formatter: Should drop a table.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not drop table being referenced by foreign keys.': {
    queries: [sql.concat(['DROP TABLE person;']).join('')],
    expect,
  },
});
