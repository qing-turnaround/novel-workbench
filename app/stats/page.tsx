import db, { getBookId } from "@/lib/db";
import StatsCharts from "./stats-charts";

export const dynamic = "force-dynamic";

export default async function WritingStats({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const stats = db.prepare(
    "SELECT * FROM writing_stats WHERE book_id = ? ORDER BY date"
  ).all(bookId) as any[];

  const totals = db.prepare(
    `SELECT COALESCE(SUM(chapters_written),0) as total_chapters,
            COALESCE(SUM(words_written),0) as total_words,
            COUNT(*) as writing_days
     FROM writing_stats WHERE book_id = ?`
  ).get(bookId) as any;

  return <StatsCharts stats={stats} totals={totals} />;
}
