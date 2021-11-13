import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'DROP INDEX u_motto ON person ALGORITHM default LOCK none;'];

run(getCompactFormat, {
  'Compact formatter: Should drop a unique index.': {
    queries: [sql.join('')],
  },
});
