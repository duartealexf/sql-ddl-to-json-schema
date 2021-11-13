import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable];

run(getCompactFormat, {
  'Compact formatter: Should create 3 tables with all datatypes, options and definitions.': {
    queries: [sql.join('')],
  },
});
