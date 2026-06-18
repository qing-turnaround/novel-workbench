import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Book, type Chapter, type StatTotals } from "../lib/api";

export default function Dashboard() {
  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [totals, setTotals] = useState<StatTotals | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getBook(), api.getChapters(), api.getStatTotals()])
      .then(([b, c, t]) => {
        setBook(b);
        setChapters(c);
        setTotals(t);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!book) return <div className="text-gray-500">Loading...</div>;

  const written = chapters.filter((c) => c.status !== "planned");
  const recent = written.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-gray-400">
          {book.genre} &middot; {book.status}
        </p>
        {book.premise && <p className="mt-2 text-gray-300">{book.premise}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="已写章节" value={`${written.length} / ${chapters.length}`} />
        <StatCard
          label="总字数"
          value={totals ? totals.total_words.toLocaleString() : "0"}
        />
        <StatCard
          label="写作天数"
          value={totals ? String(totals.writing_days) : "0"}
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">最近更新</h3>
        {recent.length === 0 ? (
          <p className="text-gray-500">还没有写过章节</p>
        ) : (
          <ul className="space-y-2">
            {recent.map((c) => (
              <li key={c.chapter_number}>
                <Link
                  to={`/chapters/${c.chapter_number}`}
                  className="block rounded bg-gray-900 p-3 transition hover:bg-gray-800"
                >
                  <span className="text-gray-400">
                    第{c.chapter_number}章
                  </span>{" "}
                  <span className="font-medium">{c.title || "无标题"}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {c.word_count}字
                  </span>
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
