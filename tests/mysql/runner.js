const { readFileSync, writeFileSync } = require('fs');

// const updateFilesOnly = process.env.DRY_UPDATE === '1';

module.exports = {
  run: (parseHandler, tests) => {
    Object.getOwnPropertyNames(tests).forEach((description) => {
      const test = tests[description];
      const expected = readFileSync(test.expect).toString();

      test.queries.forEach((query, i) => {
        it(`${description} (${i + 1})`, () => {
          const value = parseHandler(query);
          expect(JSON.stringify(value, null, 2)).toEqual(expected);

          // if (updateFilesOnly) {
          //   writeFileSync(test.expect, JSON.stringify(value, null, 2));
          // } else {
          // }
        });
      });
    });
  },
};
