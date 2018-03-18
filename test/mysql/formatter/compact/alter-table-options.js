const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-options.json');

let sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();
sql += fs.readFileSync(path.join(__dirname, 'sql', 'alter-table-options.sql')).toString();

ava('Compact formatter: Should alter table options.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  const results = parser.results;

  const json = parser.toCompactJson(results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});
