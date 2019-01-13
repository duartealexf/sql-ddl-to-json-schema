const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should alter table adding one column with options and position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) unsigned zerofill after name;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '0.json')
  },

  'Parser: Should alter table adding one column with one option and position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) unsigned after name;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '1.json')
  },

  'Parser: Should alter table adding one column with position.': {
    queries: [
      `ALTER TABLE people add column uid int(10) first;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '2.json')
  },

  'Parser: Should alter table adding one column.': {
    queries: [
      `ALTER TABLE people add column uid int(10);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '3.json')
  },

  'Parser: Should alter table adding three columns.': {
    queries: [
      `ALTER TABLE people add column (
        uid int(10) unsigned not null,
        sid int(10) unsigned,
        initials char(5)
      );`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '4.json')
  },

  'Parser: Should alter table adding one column (with parenthesis as if it was more than one).': {
    queries: [
      `ALTER TABLE people add column(status boolean);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-add-column', '5.json')
  }
});
