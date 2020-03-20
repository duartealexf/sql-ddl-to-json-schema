import { join } from 'path';

import { run } from '../../runner';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'create-database.json');

const sql = [
  'CREATE SCHEMA dbname;',
  'CREATE DATABASE dbname;',
  'CREATE SCHEMA dbname DEFAULT CHARACTER SET utf8mb4;',
  'CREATE DATABASE dbname DEFAULT CHARACTER SET utf8mb4;',
  'CREATE SCHEMA IF NOT EXISTS dbname DEFAULT CHARACTER SET utf8mb4;',
  'CREATE DATABASE IF NOT EXISTS dbname DEFAULT CHARACTER SET utf8mb4;',
];

run(getCompactFormat, {
  'Compact formatter: Should create no tables.': {
    queries: [sql.join('')],
    expect,
  },
});
