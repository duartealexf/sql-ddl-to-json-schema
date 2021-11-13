import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'DROP TABLE house, pet;'];

run(getCompactFormat, {
  'Compact formatter: Should drop two tables.': {
    queries: [sql.join('')],
  },
});
