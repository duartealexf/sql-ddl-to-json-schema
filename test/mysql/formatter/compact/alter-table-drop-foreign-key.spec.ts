import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-drop-foreign-key.json');

const sql = [createTable, 'ALTER TABLE house DROP FOREIGN KEY fk_pet_id;'];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping foreign key.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not drop unknown foreign key.': {
    queries: [sql.concat(['ALTER TABLE house DROP FOREIGN KEY fk_pet_id;']).join('')],
    expect,
  },
});
