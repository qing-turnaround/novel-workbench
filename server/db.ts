import Database from "better-sqlite3";
import { existsSync } from "fs";

const dbPath = process.env.NOVEL_DB_PATH;

if (!dbPath) {
  console.error("NOVEL_DB_PATH environment variable is required");
  process.exit(1);
}

if (!existsSync(dbPath)) {
  console.error(`Database not found: ${dbPath}`);
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });
db.pragma("journal_mode = WAL");

export default db;
