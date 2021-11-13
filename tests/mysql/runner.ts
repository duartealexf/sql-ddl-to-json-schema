import { getCompactFormat, getParsedFormat } from './parse-handler';
import { ParsedQuerySerializer } from './serializer';

type TestCases = Record<
  string,
  {
    queries: string[];
  }
>;

export const run = (
  handler: typeof getCompactFormat | typeof getParsedFormat,
  testCases: TestCases,
): void => {
  Object.getOwnPropertyNames(testCases).forEach((description) => {
    const testCase = testCases[description];

    testCase.queries.forEach((query) => {
      it(description, () => {
        const value = new ParsedQuerySerializer(handler(query));
        expect(value).toMatchSnapshot();
      });
    });
  });
};
