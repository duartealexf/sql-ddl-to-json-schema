const expect0 = require('./expect/alter-table-add-column/0.json');
const expect1 = require('./expect/alter-table-add-column/1.json');
const expect2 = require('./expect/alter-table-add-column/2.json');
const expect3 = require('./expect/alter-table-add-column/3.json');
const expect4 = require('./expect/alter-table-add-column/4.json');
const expect5 = require('./expect/alter-table-add-column/5.json');

const runner = require('../runner');

runner.run({
  'Should alter table adding one column with options and position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) unsigned zerofill after name;`
    ],
    expect: expect0
  },

  'Should alter table adding one column with one option and position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) unsigned after name;`
    ],
    expect: expect1
  },

  'Should alter table adding one column with position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) first;`
    ],
    expect: expect2
  },

  'Should alter table adding one column.': {
    queries: [
      `ALTER TABLE people add column uid int(10);`
    ],
    expect: expect3
  },

  'Should alter table adding three columns.': {
    queries: [
      `ALTER TABLE people add column (
        uid int(10) unsigned not null,
        sid int(10) unsigned,
        initials char(5)
      );`
    ],
    expect: expect4
  },

  'Should alter table adding one column (with parenthesis as if it was more than one).': {
    queries: [
      `ALTER TABLE people add column(status boolean);`
    ],
    expect: expect5
  }
});
