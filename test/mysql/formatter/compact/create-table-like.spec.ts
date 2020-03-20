import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'create-table-like.json');

const sql = [createTable, 'CREATE TABLE dog LIKE pet;'];

run(getCompactFormat, {
  'Compact formatter: Should create one table like another one.': {
    queries: [sql.join('')],
    expect,
  },
});
