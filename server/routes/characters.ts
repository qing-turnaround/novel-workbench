import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM characters ORDER BY role, name")
    .all();
  res.json(rows);
});

router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM characters WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Character not found" });
  res.json(row);
});

router.get("/:id/states", (req, res) => {
  const rows = db
    .prepare(
      "SELECT * FROM character_state_log WHERE character_id = ? ORDER BY chapter_number"
    )
    .all(req.params.id);
  res.json(rows);
});

router.get("/:id/chapters", (req, res) => {
  const rows = db
    .prepare(
      `SELECT c.chapter_number, c.title, cc.role_in_chapter
       FROM chapter_characters cc
       JOIN chapters c ON cc.chapter_id = c.id
       WHERE cc.character_id = ?
       ORDER BY c.chapter_number`
    )
    .all(req.params.id);
  res.json(rows);
});

export default router;
