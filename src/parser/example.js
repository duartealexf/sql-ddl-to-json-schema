const Parser = require('../../lib');

const parser = new Parser();

parser.feed(
  `
  CREATE OR replace table test (test bool);
  `
);

const value = parser.results;
console.log(JSON.stringify(value, null, 2));
