import db, { getBookId } from "@/lib/db";
import ForeshadowingList from "./foreshadowing-list";

export const dynamic = "force-dynamic";

export default async function ForeshadowingBoard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const items = db.prepare("SELECT * FROM foreshadowing WHERE book_id = ? ORDER BY status, planted_chapter").all(bookId) as any[];
  return <ForeshadowingList items={items} />;
}
