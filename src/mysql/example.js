const Parser = require('../../lib');

const parser = new Parser('mysql');

parser.feed(`
  CREATE TABLE person (
    id INT (10) UNSIGNED NOT NULL AUTO_INCREMENT KEY COMMENT 'primary key test'
  ) comment 'test table', engine 'XtraDB';
`);

const value = parser.results;
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));
