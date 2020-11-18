import { IMicrophone } from './src/interfaces/IMicrophone';

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function migrate() {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
  await db.migrate({ force: true });
  const microphones: IMicrophone[] = await db.all('SELECT * FROM Microphone');
}

migrate();
