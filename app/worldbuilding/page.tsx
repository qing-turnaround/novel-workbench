import db from "@/lib/db";
import WorldbuildingTabs from "./worldbuilding-tabs";

export const dynamic = "force-dynamic";

export default function WorldbuildingBrowser() {
  const entries = db.prepare("SELECT * FROM worldbuilding ORDER BY category").all() as any[];
  return <WorldbuildingTabs entries={entries} />;
}
