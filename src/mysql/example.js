const Parser = require('../../lib');
const fs = require('fs');
const path = require('path');

const parser = new Parser('mysql');

let sql = fs.readFileSync(path.join(__dirname, '../', '../', 'test', 'mysql', 'formatter', 'compact', 'sql', 'create-table.sql')).toString();
// let sql = 'CREATE TABLE person (a bool);';
sql += fs.readFileSync(path.join(__dirname, '../', '../', 'test', 'mysql', 'formatter', 'compact', 'sql', 'alter-table-options.sql')).toString();
parser.feed(sql);

// parser.feed(`
// alter table qwe COMPRESSION 'ZLIB', COMMENT 'test' Comment 'hi';
// `);

const value = parser.results;
// console.log(JSON.stringify(value, null, 2));
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));
