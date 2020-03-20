import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-change-charset.json');

const sql = [
  createTable,
  'ALTER TABLE person DEFAULT CHARACTER SET latin1 COLLATE = latin1_general_ci;',
  'ALTER TABLE pet CHARACTER SET pet_charset;',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, changing charset.': {
    queries: [sql.join('')],
    expect,
  },
});
