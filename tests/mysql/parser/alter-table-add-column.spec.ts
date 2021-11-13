import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding one column with options and position.': {
    queries: [`ALTER TABLE people add column uid int(10) unsigned zerofill after name;`],
  },

  'Parser: Should alter table adding one column with one option and position.': {
    queries: [`ALTER TABLE people add column uid int(10) unsigned after name;`],
  },

  'Parser: Should alter table adding one column with position.': {
    queries: [`ALTER TABLE people add column uid int(10) first;`],
  },

  'Parser: Should alter table adding one column.': {
    queries: [`ALTER TABLE people add column uid int(10);`],
  },

  'Parser: Should alter table adding three columns.': {
    queries: [
      `ALTER TABLE people add column (
        uid int(10) unsigned not null,
        sid int(10) unsigned,
        initials char(5)
      );`,
    ],
  },

  'Parser: Should alter table adding one column (with parenthesis as if it was more than one).': {
    queries: [`ALTER TABLE people add column(status boolean);`],
  },
});
