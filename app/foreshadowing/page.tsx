import db from "@/lib/db";
import ForeshadowingList from "./foreshadowing-list";

export const dynamic = "force-dynamic";

export default function ForeshadowingBoard() {
  const items = db.prepare("SELECT * FROM foreshadowing ORDER BY status, planted_chapter").all() as any[];
  return <ForeshadowingList items={items} />;
}
