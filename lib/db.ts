import Database from "better-sqlite3";

const dbPath = process.env.NOVEL_DB_PATH || `${process.env.HOME}/project/novels/novels.db`;

const db = new Database(dbPath, { readonly: true });
db.pragma("journal_mode = WAL");

export default db;

export function getBooks() {
  return db.prepare("SELECT id, title, genre, status, dir_name FROM book ORDER BY updated_at DESC").all() as any[];
}

export function getBookId(searchParams: Record<string, string | string[] | undefined>): number | null {
  const bookParam = searchParams?.book;
  if (bookParam) return parseInt(String(bookParam));
  const first = db.prepare("SELECT id FROM book ORDER BY updated_at DESC LIMIT 1").get() as any;
  return first?.id || null;
}
