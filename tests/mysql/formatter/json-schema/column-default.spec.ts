import { JSONSchema7 } from 'json-schema';
import { getJSONSchemaFormat } from '../../parse-handler';

const sql = `CREATE TABLE t (
  a INT DEFAULT 5,
  b DECIMAL(4,2) DEFAULT 1.5,
  c VARCHAR(3) DEFAULT 'x',
  d VARCHAR(3) DEFAULT '',
  e BOOLEAN DEFAULT TRUE,
  f TINYINT(1) DEFAULT 0,
  g BOOLEAN DEFAULT false,
  h BOOLEAN DEFAULT 1,
  i BOOL DEFAULT 0,
  j INT DEFAULT -3,
  k INT DEFAULT NULL,
  l INT
);`;

describe('JSON Schema formatter: column defaults', () => {
  const [schema] = getJSONSchemaFormat(sql, { useRef: false }) as JSONSchema7[];
  const props = schema.properties as Record<string, JSONSchema7>;

  it.each([
    ['a', 5],
    ['b', 1.5],
    ['c', 'x'],
    ['d', ''],
    ['e', true],
    ['f', 0],
    ['g', false],
    ['h', true],
    ['i', false],
    ['j', -3],
    ['k', null],
  ])('column %s has default %p', (column, expected) => {
    expect(props[column]).toHaveProperty('default', expected);
  });

  it('omits default when the column has none', () => {
    expect(props.l).not.toHaveProperty('default');
  });
});
