import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'CREATE TABLE dog LIKE pet;'];

run(getCompactFormat, {
  'Compact formatter: Should create one table like another one.': {
    queries: [sql.join('')],
  },
});
