import express from "express";
import notesRouter from "./routes/notes/notes.router";
import notesAssetsRouter from "./routes/note-assets/note-assets.router";
import reactionsRouter from "./routes/reactions/reactions.router";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/notes", notesRouter);

app.use("/api/assets", notesAssetsRouter);

app.use("/api/reactions", reactionsRouter);

export default app;
