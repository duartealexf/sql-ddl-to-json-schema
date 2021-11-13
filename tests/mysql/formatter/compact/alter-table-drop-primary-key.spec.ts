import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'ALTER TABLE house DROP PRIMARY KEY;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping primary key.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Should not drop primary key containing an autoincrement column.': {
    queries: [sql.concat(['ALTER TABLE person DROP PRIMARY KEY;']).join('')],
  },
});
