const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');

const personTable = require('./expect/person.json');
const petTable = require('./expect/pet.json');
const houseTable = require('./expect/house.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('JSON Schema formatter: should format array elements correctly.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  const jsonSchemas = parser.toJsonSchemaArray();

  const personSchema = jsonSchemas.find(s => s.$id === 'person');
  const petSchema = jsonSchemas.find(s => s.$id === 'pet');
  const houseSchema = jsonSchemas.find(s => s.$id === 'house');
  // fs.writeFileSync(path.join(__dirname, 'expect', 'person.json'), JSON.stringify(personSchema, null, 2));
  // fs.writeFileSync(path.join(__dirname, 'expect', 'pet.json'), JSON.stringify(petSchema, null, 2));
  // fs.writeFileSync(path.join(__dirname, 'expect', 'house.json'), JSON.stringify(houseSchema, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(personSchema), JSON.stringify(personTable));
  t.is(JSON.stringify(petSchema), JSON.stringify(petTable));
  t.is(JSON.stringify(houseSchema), JSON.stringify(houseTable));
  // t.pass();
});

