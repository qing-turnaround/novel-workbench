import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const category = req.query.category;
  if (category) {
    const rows = db
      .prepare("SELECT * FROM worldbuilding WHERE category = ?")
      .all(category);
    return res.json(rows);
  }
  const rows = db.prepare("SELECT * FROM worldbuilding ORDER BY category").all();
  res.json(rows);
});

export default router;
