import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (_req, res) => {
  const book = db.prepare("SELECT * FROM book LIMIT 1").get();
  if (!book) return res.status(404).json({ error: "No book found" });
  res.json(book);
});

export default router;
