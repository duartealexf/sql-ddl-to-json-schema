const Parser = require('../../lib');
// const fs = require('fs');
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const parser = new Parser('mysql');

const sql = readFileSync(join(__dirname, 'example', 'example.sql')).toString();

parser.feed(sql);

// parser.feed(sql)
//   .toJsonSchemaFiles(join(__dirname, 'example'))
//   .then(outputFilePaths => {
//     console.log(JSON.stringify(outputFilePaths, null, 2));
//   });

let result;
result = parser.results;
// result = parser.toCompactJson(result);
// result = parser.toJsonSchemaArray(result);
const filepath = join(__dirname, '../../', 'test/mysql/parser/expect/create-table/0.json');
writeFileSync(filepath, JSON.stringify(result, null, 2));

// result = parser.results;
// result = parser.toCompactJson(result);
// result = parser.toJsonSchemaArray(result);
// console.log(JSON.stringify(result, null, 2));

// result = parser.toJsonSchemaFiles(join(__dirname, 'example'), {
//   extension: '.schema.json',
//   indent: 2
// }, result)
//   .then(files => {
//     console.log(JSON.stringify(files, null, 2));
//   })
//   .catch(reason => {
//     console.log(reason);
//   });
// console.log(JSON.stringify(result[0], null, 2));

