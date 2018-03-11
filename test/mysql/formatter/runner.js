const ava = require('ava');
const Parser = require('../../../lib');

module.exports = {
  run: tests => {
    Object.getOwnPropertyNames(tests).forEach(description => {
      const test = tests[description];
      const testname = `Compact formatter: ${description} \n ${test.query}`;

      const parser = new Parser('mysql');
      parser.feed(test.query);

      ava(testname, t => {
        const value = parser.results;
        const json = parser.toCompactJson(value);
        t.deepEqual(json, test.expect);
      });

    });
  }
};

