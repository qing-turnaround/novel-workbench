import db from "@/lib/db";
import StatsCharts from "./stats-charts";

export const dynamic = "force-dynamic";

export default function WritingStats() {
  const stats = db.prepare(
    "SELECT * FROM writing_stats ORDER BY date"
  ).all() as any[];

  const totals = db.prepare(
    `SELECT COALESCE(SUM(chapters_written),0) as total_chapters,
            COALESCE(SUM(words_written),0) as total_words,
            COUNT(*) as writing_days
     FROM writing_stats`
  ).get() as any;

  return <StatsCharts stats={stats} totals={totals} />;
}
