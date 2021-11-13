import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'ALTER TABLE person RENAME TO people;', 'ALTER TABLE pet RENAME AS dog;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, renaming it.': {
    queries: [sql.join('')],
  },
});
