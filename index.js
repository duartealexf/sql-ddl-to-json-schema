const Parser = require('./lib/parser');
const parser = new Parser('postgres');
var fs = require('fs');


// DO stuff
// const parser = new lib.Parser('postgres');

// TODO: Run pg_dump based on config file or params

// todo; get sql from file
const sql = fs.readFileSync('stratejos_slack_db_schema.sql').toString();

const jsonSchemaDocuments = parser.feed(sql)
  .toJsonSchemaArray();
  
console.log('jsonSchemaDocuments >>', jsonSchemaDocuments)

// module.exports = lib;
