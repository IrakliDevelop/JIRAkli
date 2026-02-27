import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';

const dbPath = process.env.DATABASE_PATH ?? './data/jirakli.db';

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

console.log('Running migrations...');

migrate(db, { migrationsFolder: path.join(__dirname, 'migrations') });

console.log('Migrations complete');
sqlite.close();
