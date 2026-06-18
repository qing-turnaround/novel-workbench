import Database from "better-sqlite3";

const dbPath = process.env.NOVEL_DB_PATH;
if (!dbPath) {
  throw new Error("NOVEL_DB_PATH environment variable is required");
}

const db = new Database(dbPath, { readonly: true });
db.pragma("journal_mode = WAL");

export default db;
