import db from "@/lib/db";
import CharacterDetail from "./character-detail";

export const dynamic = "force-dynamic";

export default function CharacterGraph() {
  const characters = db.prepare("SELECT * FROM characters ORDER BY role, name").all() as any[];

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
