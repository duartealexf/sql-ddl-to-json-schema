import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Parser: Should drop people table': {
    queries: [
      'DROP TABLE people;',
      'drop table people;',
      'drop temporary table people;',
      'drop temporary table if exists people;',
      'drop temporary table if exists people restrict;',
      'drop temporary table if exists people cascade;',
    ],
    expect: join(__dirname, 'expect', 'drop-table', '0.json'),
  },

  'Parser: Should drop several tables': {
    queries: [
      'DROP TABLE people, cars,pets ,test;',
      'drop table people, cars,pets ,test;',
      'drop temporary table people, cars,pets ,test;',
      'drop temporary table if exists people, cars,pets ,test;',
      'drop temporary table if exists people, cars,pets ,test restrict;',
      'drop temporary table if exists people, cars,pets ,test cascade;',
    ],
    expect: join(__dirname, 'expect', 'drop-table', '1.json'),
  },
});
