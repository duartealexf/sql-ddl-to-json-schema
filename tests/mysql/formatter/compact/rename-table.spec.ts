import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'ALTER TABLE person RENAME TO people;'];

run(getCompactFormat, {
  'Compact formatter: Compact formatter: Should rename table.': {
    queries: [sql.join('')],
  },
});
