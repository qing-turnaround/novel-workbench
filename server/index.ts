import express from "express";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import bookRouter from "./routes/book.js";
import chaptersRouter from "./routes/chapters.js";
import charactersRouter from "./routes/characters.js";
import foreshadowingRouter from "./routes/foreshadowing.js";
import worldbuildingRouter from "./routes/worldbuilding.js";
import qualityRouter from "./routes/quality.js";
import statsRouter from "./routes/stats.js";

const app = express();
const PORT = parseInt(process.env.PORT || "3456");
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/api/book", bookRouter);
app.use("/api/chapters", chaptersRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/foreshadowing", foreshadowingRouter);
app.use("/api/worldbuilding", worldbuildingRouter);
app.use("/api/quality", qualityRouter);
app.use("/api/stats", statsRouter);

const clientDist = join(__dirname, "../dist/client");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Novel workbench running at http://localhost:${PORT}`);
  console.log(`Database: ${process.env.NOVEL_DB_PATH}`);
});
