const ava = require('ava');
const Parser = require('../../lib');

const expect0 = require('./expect/alter-table-misc/0.json');
const expect1 = require('./expect/alter-table-misc/1.json');
const expect2 = require('./expect/alter-table-misc/2.json');
const expect3 = require('./expect/alter-table-misc/3.json');
const expect4 = require('./expect/alter-table-misc/4.json');
const expect5 = require('./expect/alter-table-misc/5.json');
const expect6 = require('./expect/alter-table-misc/6.json');
const expect7 = require('./expect/alter-table-misc/7.json');
const expect8 = require('./expect/alter-table-misc/8.json');
const expect9 = require('./expect/alter-table-misc/9.json');
const expect10 = require('./expect/alter-table-misc/10.json');
const expect11 = require('./expect/alter-table-misc/11.json');
const expect12 = require('./expect/alter-table-misc/12.json');
const expect13 = require('./expect/alter-table-misc/13.json');

const tests = {
  'Should alter table algorithm, with online, ignore and wait keywords.': {
    queries: [
      `ALTER online ignore TABLE people wait 5 algorithm = default;`,
      `ALTER TABLE people algorithm=default;`,
      `ALTER TABLE people algorithm default;`
    ],
    expect: expect0
  },

  'Should alter column default value.': {
    queries: [
      `ALTER TABLE people alter column age set default 18;`,
      `ALTER TABLE people alter age set default 18;`,
    ],
    expect: expect1
  },

  'Should drop column default value.': {
    queries: [
      `ALTER TABLE people alter column name drop default;`,
      `ALTER TABLE people alter name drop default;`,
    ],
    expect: expect2
  },

  'Should alter table default character set and collation.': {
    queries: [
      `ALTER TABLE people default character set utf8 collate utf8_general_ci;`,
      `ALTER TABLE people character set = utf8 collate = utf8_general_ci;`,
      `ALTER TABLE people character set=utf8 collate=utf8_general_ci;`,
    ],
    expect: expect3
  },

  'Should alter table default character set.': {
    queries: [
      `ALTER TABLE people default character set utf8;`,
      `ALTER TABLE people character set = utf8;`,
      `ALTER TABLE people character set=utf8;`,
    ],
    expect: expect4
  },

  'Should alter table converting to character set and collation.': {
    queries: [
      `ALTER TABLE people convert to character set utf8 collate utf8_general_ci;`,
    ],
    expect: expect5
  },

  'Should alter table converting to character set.': {
    queries: [
      `ALTER TABLE people convert to character set utf8;`,
    ],
    expect: expect6
  },

  'Should run several simple alter table statements.': {
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
    expect: expect7
  },

  'Should run one alter table statement with several alter table specs and options.': {
    queries: [
      `
      ALTER TABLE people comment 'test', enable keys , disable keys,discard tablespace,
      import tablespace ,force, comment 'another test',
      with validation, without validation, rename to persons
      ,rename persons;
      `,
    ],
    expect: expect8
  },

  'Should run one alter table statement with only one option.': {
    queries: [
      `
      ALTER TABLE people comment 'test';
      `,
    ],
    expect: expect9
  },

  'Should alter table lock.': {
    queries: [
      `ALTER TABLE people lock default;`,
      `ALTER TABLE people lock=default;`,
      `ALTER TABLE people lock = default;`,
    ],
    expect: expect10
  },

  'Should alter table ordering by several columns.': {
    queries: [
      `ALTER TABLE people order by id, initials,name ,fullname , family;`,
    ],
    expect: expect11
  },

  'Should alter table ordering by one column.': {
    queries: [
      `ALTER TABLE people order by id;`,
    ],
    expect: expect12
  },

  'Should alter table adding period for system_time.': {
    queries: [
      `alter table test add period for system_time (test1, test2);`,
    ],
    expect: expect13
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});
