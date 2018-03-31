const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/drop-table-multi.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should drop two tables.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP TABLE house, pet;');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'drop-table-multi.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
