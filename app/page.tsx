import Link from "next/link";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const book = db.prepare("SELECT * FROM book LIMIT 1").get() as any;
  if (!book) return <div className="text-gray-500">No book found. Run /novel-setup first.</div>;

  const chapters = db.prepare("SELECT * FROM chapters ORDER BY chapter_number").all() as any[];
  const written = chapters.filter((c) => c.status !== "planned");
  const recent = written.slice(-5).reverse();

  const totals = db.prepare(
    `SELECT COALESCE(SUM(chapters_written),0) as total_chapters,
            COALESCE(SUM(words_written),0) as total_words,
            COUNT(*) as writing_days
     FROM writing_stats`
  ).get() as any;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-gray-400">{book.genre} &middot; {book.status}</p>
        {book.premise && <p className="mt-2 text-gray-300">{book.premise}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="已写章节" value={`${written.length} / ${chapters.length}`} />
        <StatCard label="总字数" value={totals.total_words.toLocaleString()} />
        <StatCard label="写作天数" value={String(totals.writing_days)} />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">最近更新</h3>
        {recent.length === 0 ? (
          <p className="text-gray-500">还没有写过章节</p>
        ) : (
          <ul className="space-y-2">
            {recent.map((c: any) => (
              <li key={c.chapter_number}>
                <Link
                  href={`/chapters/${c.chapter_number}`}
                  className="block rounded bg-gray-900 p-3 transition hover:bg-gray-800"
                >
                  <span className="text-gray-400">第{c.chapter_number}章</span>{" "}
                  <span className="font-medium">{c.title || "无标题"}</span>
                  <span className="ml-2 text-sm text-gray-500">{c.word_count}字</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-900 p-4">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
