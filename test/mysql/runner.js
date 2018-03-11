const ava = require('ava');
const Parser = require('../../lib');

module.exports = {
  run: tests => {
    Object.getOwnPropertyNames(tests).forEach(description => {
      const test = tests[description];

      test.queries.forEach(query => {

        const testname = `Parser: ${description} \n ${query}`;

        const parser = new Parser('mysql');
        parser.feed(query);

        ava(testname, t => {
          const value = parser.results;
          t.deepEqual(value, test.expect);
        });
      });
    });
  }
};

