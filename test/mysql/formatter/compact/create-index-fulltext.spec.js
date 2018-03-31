const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/create-index-fulltext.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should create fulltext index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed(`
    CREATE FULLTEXT INDEX fi_name
    using rtree
    on person (name(20) asc)
    key_block_size 4096
    using rtree
    with parser initialsParser
    algorithm default
    lock none;
  `);

  // Shouldn't create fulltext index for unknown column.
  parser.feed('CREATE FULLTEXT INDEX f_abcxyz on person (abcxyz);');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'create-index-fulltext.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
