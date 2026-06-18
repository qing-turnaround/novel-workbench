import db, { getBookId } from "@/lib/db";
import CharacterDetail from "./character-detail";

export const dynamic = "force-dynamic";

export default async function CharacterGraph({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const characters = db.prepare("SELECT * FROM characters WHERE book_id = ? ORDER BY role, name").all(bookId) as any[];

  const statesMap: Record<number, any[]> = {};
  const appearancesMap: Record<number, any[]> = {};

  for (const c of characters) {
    statesMap[c.id] = db.prepare(
      "SELECT * FROM character_state_log WHERE character_id = ? ORDER BY chapter_number"
    ).all(c.id) as any[];

    appearancesMap[c.id] = db.prepare(
      `SELECT c.chapter_number, c.title, cc.role_in_chapter
       FROM chapter_characters cc
       JOIN chapters c ON cc.chapter_id = c.id
       WHERE cc.character_id = ?
       ORDER BY c.chapter_number`
    ).all(c.id) as any[];
  }

  return (
    <CharacterDetail
      characters={characters}
      statesMap={statesMap}
      appearancesMap={appearancesMap}
    />
  );
}
