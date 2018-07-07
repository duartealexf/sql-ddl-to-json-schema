const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/create-table.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should create 3 tables with all datatypes, options and definitions.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'create-table.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
