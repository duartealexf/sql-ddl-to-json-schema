const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/create-index-unique.json');

let sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();
sql += fs.readFileSync(path.join(__dirname, 'sql', 'create-index-unique.sql')).toString();

ava('Compact formatter: Should create index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  const json = parser.toCompactJson(parser.results);
  console.log(JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});
