import db, { getBookId } from "@/lib/db";
import WorldbuildingTabs from "./worldbuilding-tabs";

export const dynamic = "force-dynamic";

export default async function WorldbuildingBrowser({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const entries = db.prepare("SELECT * FROM worldbuilding WHERE book_id = ? ORDER BY category").all(bookId) as any[];
  return <WorldbuildingTabs entries={entries} />;
}
