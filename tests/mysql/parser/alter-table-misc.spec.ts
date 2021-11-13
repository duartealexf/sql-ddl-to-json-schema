import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table algorithm, with online, ignore and wait keywords.': {
    queries: [
      `ALTER online ignore TABLE people wait 5 algorithm = default;`,
      `ALTER TABLE people algorithm=default;`,
      `ALTER TABLE people algorithm default;`,
    ],
  },

  'Parser: Should alter column default value.': {
    queries: [
      `ALTER TABLE people alter column age set default 18;`,
      `ALTER TABLE people alter age set default 18;`,
    ],
  },

  'Parser: Should drop column default value.': {
    queries: [
      `ALTER TABLE people alter column name drop default;`,
      `ALTER TABLE people alter name drop default;`,
    ],
  },

  'Parser: Should alter table default character set and collation.': {
    queries: [
      `ALTER TABLE people default character set utf8 collate utf8_general_ci;`,
      `ALTER TABLE people character set = utf8 collate = utf8_general_ci;`,
      `ALTER TABLE people character set=utf8 collate=utf8_general_ci;`,
    ],
  },

  'Parser: Should alter table default character set.': {
    queries: [
      `ALTER TABLE people default character set utf8;`,
      `ALTER TABLE people character set = utf8;`,
      `ALTER TABLE people character set=utf8;`,
    ],
  },

  'Parser: Should alter table converting to character set and collation.': {
    queries: [`ALTER TABLE people convert to character set utf8 collate utf8_general_ci;`],
  },

  'Parser: Should alter table converting to character set.': {
    queries: [`ALTER TABLE people convert to character set utf8;`],
  },

  'Parser: Should run several simple alter table statements.': {
    queries: [
      `
      ALTER TABLE people enable keys;
      ALTER TABLE people disable keys;
      ALTER TABLE people discard tablespace;
      ALTER TABLE people import tablespace;
      ALTER TABLE people force;
      ALTER TABLE people with validation;
      ALTER TABLE people without validation;
      ALTER TABLE people rename to persons;
      ALTER TABLE people rename persons;
      `,
    ],
  },

  'Parser: Should run one alter table statement with several alter table specs and options.': {
    queries: [
      `
      ALTER TABLE people comment 'test', enable keys , disable keys,discard tablespace,
      import tablespace ,force, comment 'another test',
      with validation, without validation, rename to persons
      ,rename persons;
      `,
    ],
  },

  'Parser: Should run one alter table statement with only one option.': {
    queries: [
      `
      ALTER TABLE people comment 'test';
      `,
    ],
  },

  'Parser: Should alter table lock.': {
    queries: [
      `ALTER TABLE people lock default;`,
      `ALTER TABLE people lock=default;`,
      `ALTER TABLE people lock = default;`,
    ],
  },

  'Parser: Should alter table ordering by several columns.': {
    queries: [`ALTER TABLE people order by id, initials,name ,fullname , family;`],
  },

  'Parser: Should alter table ordering by one column.': {
    queries: [`ALTER TABLE people order by id;`],
  },

  'Parser: Should alter table adding period for system_time.': {
    queries: [`alter table test add period for system_time (test1, test2);`],
  },
});
