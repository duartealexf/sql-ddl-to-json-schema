const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-options.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava.todo('Will test ALTER TABLE with a lot of table options.');
