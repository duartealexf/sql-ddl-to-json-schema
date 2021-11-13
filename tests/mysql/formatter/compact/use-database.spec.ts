import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';

const sql = ['USE dbname;', 'USE `dbname`;'];

run(getCompactFormat, {
  'Compact formatter: Should use database.': {
    queries: [sql.join('')],
  },
});
