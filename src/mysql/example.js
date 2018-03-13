const Parser = require('../../lib');
const fs = require('fs');
const path = require('path');

const parser = new Parser('mysql');

let sql = fs.readFileSync(path.join(__dirname, '../', '../', 'test', 'mysql', 'formatter', 'compact', 'sql', 'create-table.sql')).toString();
sql += fs.readFileSync(path.join(__dirname, '../', '../', 'test', 'mysql', 'formatter', 'compact', 'sql', 'create-index-fulltext.sql')).toString();

parser.feed(sql);

const value = parser.results;
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));
