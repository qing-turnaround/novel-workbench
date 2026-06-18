import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const range = (req.query.range as string) || "30d";
  const days = parseInt(range) || 30;

  const rows = db
    .prepare(
      `SELECT * FROM writing_stats
       WHERE date >= date('now', '-${days} days')
       ORDER BY date`
    )
    .all();
  res.json(rows);
});

router.get("/totals", (_req, res) => {
  const totals = db
    .prepare(
      `SELECT
        COALESCE(SUM(chapters_written), 0) as total_chapters,
        COALESCE(SUM(words_written), 0) as total_words,
        COUNT(*) as writing_days
      FROM writing_stats`
    )
    .get();
  res.json(totals);
});

export default router;
