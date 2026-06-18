import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const volume = req.query.volume;
  if (volume) {
    const rows = db
      .prepare(
        "SELECT id, chapter_number, title, volume_id, word_count, status, summary, pov_character_id, created_at, updated_at FROM chapters WHERE volume_id = ? ORDER BY chapter_number"
      )
      .all(volume);
    return res.json(rows);
  }
  const rows = db
    .prepare(
      "SELECT id, chapter_number, title, volume_id, word_count, status, summary, pov_character_id, created_at, updated_at FROM chapters ORDER BY chapter_number"
    )
    .all();
  res.json(rows);
});

router.get("/:number", (req, res) => {
  const row = db
    .prepare("SELECT * FROM chapters WHERE chapter_number = ?")
    .get(req.params.number);
  if (!row) return res.status(404).json({ error: "Chapter not found" });
  res.json(row);
});

export default router;
