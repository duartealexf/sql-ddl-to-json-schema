import { join } from 'path';

import { run } from '../../runner';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'use-database.json');

const sql = ['USE dbname;', 'USE `dbname`;'];

run(getCompactFormat, {
  'Compact formatter: Should use database.': {
    queries: [sql.join('')],
    expect,
  },
});
