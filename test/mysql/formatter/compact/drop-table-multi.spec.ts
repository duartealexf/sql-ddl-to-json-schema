import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'drop-table-multi.json');

const sql = [createTable, 'DROP TABLE house, pet;'];

run(getCompactFormat, {
  'Compact formatter: Should drop two tables.': {
    queries: [sql.join('')],
    expect,
  },
});
