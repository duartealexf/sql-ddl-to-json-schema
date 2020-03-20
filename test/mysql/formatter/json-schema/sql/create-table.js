const { readFileSync } = require('fs');
const { join } = require('path');

const sqlFile = join(__dirname, 'create-table.sql');
const sql = readFileSync(sqlFile).toString();

module.exports = sql;
