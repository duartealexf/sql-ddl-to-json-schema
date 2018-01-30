const ava = require('ava');
const Parser = require('../lib');
const testsRun = new Set();

[
  {
    d: 'Should create test database',
    q: [
      'CREATE DATABASE test',
      'CREATE DATABASE IF EXISTS test',
      'CREATE DATABASE IF NOT EXISTS test',
      'CREATE DATABASE `test`',

      'create database test',
      'create database if exists test',
      'create database if not exists test',
      'create database `test`',

      'create database test CHARACTER SET utf8',
      'create database test CHARACTER SET = utf8',
    ],
    x: {
      database: 'test'
    }
  },

  // {
  //   d: 'Should create table with only id field, inline statement',
  //   q: `CREATE TABLE action_types (id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY)`,
  //   x: {
  //     id: {
  //       type: 'INT',
  //       bytes: 10,
  //       nullable: false,
  //       autoincrement: true,
  //       primary: true
  //     }
  //   }
  // },


]
  .forEach(test => {

    if (testsRun.has(test.d)) {
      console.error('Duplicate test description found: ' + test.d);
      console.error('Aborting tests.');
      process.exit(1);
    }

    ava(test.d, t => {
      test.q = Array.isArray(test.q) ? test.q : test.q;

      test.q.forEach(query => {
        const parser = new Parser();
        parser.feed(query);

        const value = parser.results;
        t.deepEqual(value, test.x, test.d);
      });
    });
  });
