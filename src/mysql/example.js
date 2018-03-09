const Parser = require('../../lib');

const parser = new Parser('mysql');

parser.feed(
  `CREATE OR replace table test (test bool);`
);

const value = parser.results;
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));
