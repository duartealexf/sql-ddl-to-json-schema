import { readFileSync, writeFileSync } from 'fs';
import ava from 'ava';
import { ParseHandler, Tests } from './typings';

const updateFilesOnly = process.env.DRY_UPDATE === '1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run = (parseHandler: ParseHandler<any>, tests: Tests): void => {
  Object.getOwnPropertyNames(tests).forEach((description) => {
    const test = tests[description];
    const expect = readFileSync(test.expect).toString();

    test.queries.forEach((query: string, i: number) => {
      ava(`${description} (${i + 1})`, (t) => {
        const value = parseHandler(query);

        if (updateFilesOnly) {
          writeFileSync(test.expect, JSON.stringify(value, null, 2));
          t.pass();
        } else {
          t.is(JSON.stringify(value, null, 2), expect);
        }
      });
    });
  });
};
