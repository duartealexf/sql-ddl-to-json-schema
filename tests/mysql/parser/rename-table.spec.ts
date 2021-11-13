import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Should rename one table.': {
    queries: ['RENAME TABLE people TO persons;', 'rename table people to persons;'],
  },

  'Should rename several tables.': {
    queries: ['rename table people to persons, homes to houses,cats to pets ,test to tests;'],
  },
});
