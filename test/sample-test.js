const test = require('ava');
const Parser = require('../lib');

test('basic-addition', t => {
  const parser = new Parser();
  parser.feed('1 + 1');
  const value = parser.results;
  const expected = { "type":"main","d":[null,{ "type":"A","d":[{ "v":1 },null,"+",null,{ "v":1 }],"v":2 },null],"v":2 };
  t.deepEqual(value, expected, 'Parsed value does not match expected result');
});
