import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'DROP TABLE house;'];

run(getCompactFormat, {
  'Compact formatter: Should drop a table.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Should not drop table being referenced by foreign keys.': {
    queries: [sql.concat(['DROP TABLE person;']).join('')],
  },
});
