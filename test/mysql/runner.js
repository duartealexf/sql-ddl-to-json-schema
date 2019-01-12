const ava = require('ava');
const { readFileSync, writeFileSync } = require('fs');

const updateFilesOnly = process.env.DRY_UPDATE === '1';

module.exports = {
  run: (parseHandler, tests) => {
    Object.getOwnPropertyNames(tests).forEach(description => {
      const test = tests[description];
      const expect = readFileSync(test.expect);

      test.queries.forEach(query => {
        ava(description, t => {
          const value = parseHandler(query);

          if (updateFilesOnly) {
            writeFileSync(test.expect, JSON.stringify(value, null, 2));
            t.pass();
          } else {
            t.is(JSON.stringify(value/*, null, 2*/), JSON.stringify(expect/*, null, 2*/));
          }
        });
      });
    });
  }
};

