// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParseHandler<T> = (query: string, ...args: any[]) => T;

export type Test = {
  queries: string[];
  expect: string;
};

export type Tests = {
  [description: string]: Test;
};
