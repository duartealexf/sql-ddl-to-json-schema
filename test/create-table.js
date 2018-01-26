const ava = require('ava');
const Parser = require('../lib');
const testsRun = new Set();

[
  {
    d: 'Should create table with only id field, inline statement',
    q: `CREATE TABLE action_types (id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY)`,
    x: {
      id: {
        type: 'INT',
        bytes: 10,
        nullable: false,
        autoincrement: true,
        primary: true
      }
    }
  }
]
  .forEach(test => {

    if (testsRun.has(test.d)) {
      console.error('Duplicate test description found: ' + test.d);
      console.error('Aborting tests.');
      process.exit(1);
    }

    ava(test.d, t => {
      const parser = new Parser();
      parser.feed(test.q);
      const value = parser.results;
      t.deepEqual(value, test.x, test.d);
    });
  });
