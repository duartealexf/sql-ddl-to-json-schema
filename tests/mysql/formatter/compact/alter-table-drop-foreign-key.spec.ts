import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable, 'ALTER TABLE house DROP FOREIGN KEY fk_pet_id;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping foreign key.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Should not drop unknown foreign key.': {
    queries: [sql.concat(['ALTER TABLE house DROP FOREIGN KEY fk_pet_id;']).join('')],
  },
});
