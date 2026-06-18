import db, { getBookId } from "@/lib/db";
import QualityList from "./quality-list";

export const dynamic = "force-dynamic";

export default async function QualityDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const audits = db.prepare(
    `SELECT qa.*, c.chapter_number, c.title as chapter_title
     FROM quality_audits qa
     LEFT JOIN chapters c ON qa.chapter_id = c.id
     WHERE c.book_id = ?
     ORDER BY qa.created_at DESC`
  ).all(bookId) as any[];

  const summary = {
    total: audits.length,
    errors: audits.filter((a) => a.severity === "error").length,
    warnings: audits.filter((a) => a.severity === "warning").length,
    infos: audits.filter((a) => a.severity === "info").length,
    unresolved: audits.filter((a) => !a.resolved).length,
    byType: Object.entries(
      audits.reduce(
        (acc, a) => ({ ...acc, [a.audit_type]: (acc[a.audit_type] || 0) + 1 }),
        {} as Record<string, number>
      )
    ),
  };

  return <QualityList audits={audits} summary={summary} />;
}
