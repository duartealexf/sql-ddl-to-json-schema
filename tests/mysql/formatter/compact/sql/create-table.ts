import { readFileSync } from 'fs';
import { join } from 'path';

const sqlFile = join(__dirname, 'create-table.sql');
const sql = readFileSync(sqlFile).toString();

export default sql;
