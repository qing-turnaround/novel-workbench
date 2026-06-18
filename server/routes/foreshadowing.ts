import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const status = req.query.status;
  if (status) {
    const rows = db
      .prepare(
        "SELECT * FROM foreshadowing WHERE status = ? ORDER BY planted_chapter"
      )
      .all(status);
    return res.json(rows);
  }
  const rows = db
    .prepare("SELECT * FROM foreshadowing ORDER BY status, planted_chapter")
    .all();
  res.json(rows);
});

export default router;
