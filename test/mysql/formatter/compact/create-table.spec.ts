import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'create-table.json');

const sql = [createTable];

run(getCompactFormat, {
  'Compact formatter: Should create 3 tables with all datatypes, options and definitions.': {
    queries: [sql.join('')],
    expect,
  },
});
