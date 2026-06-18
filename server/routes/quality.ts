import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (req, res) => {
  const { type, severity } = req.query;
  let sql = "SELECT qa.*, c.chapter_number, c.title as chapter_title FROM quality_audits qa LEFT JOIN chapters c ON qa.chapter_id = c.id WHERE 1=1";
  const params: string[] = [];

  if (type) {
    sql += " AND qa.audit_type = ?";
    params.push(type as string);
  }
  if (severity) {
    sql += " AND qa.severity = ?";
    params.push(severity as string);
  }

  sql += " ORDER BY qa.created_at DESC";
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

router.get("/summary", (_req, res) => {
  const summary = {
    total: db.prepare("SELECT COUNT(*) as count FROM quality_audits").get(),
    by_severity: db
      .prepare(
        "SELECT severity, COUNT(*) as count FROM quality_audits GROUP BY severity"
      )
      .all(),
    by_type: db
      .prepare(
        "SELECT audit_type, COUNT(*) as count FROM quality_audits GROUP BY audit_type"
      )
      .all(),
    unresolved: db
      .prepare("SELECT COUNT(*) as count FROM quality_audits WHERE resolved = 0")
      .get(),
  };
  res.json(summary);
});

export default router;
