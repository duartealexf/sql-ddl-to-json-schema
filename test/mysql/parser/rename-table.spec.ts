import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Should rename one table.': {
    queries: ['RENAME TABLE people TO persons;', 'rename table people to persons;'],
    expect: join(__dirname, 'expect', 'rename-table', '0.json'),
  },

  'Should rename several tables.': {
    queries: ['rename table people to persons, homes to houses,cats to pets ,test to tests;'],
    expect: join(__dirname, 'expect', 'rename-table', '1.json'),
  },
});
