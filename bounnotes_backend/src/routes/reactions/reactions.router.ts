import { Router } from "express";

import {
  setReaction,
  deleteReactionByNoteAndUser,
} from "./reactions.repository";

import { findNoteRowById } from "../notes/notes.repository";

import { mapReactionRowToItem } from "./reactions.mapper";

import type { ReactionType } from "./reactions.types";
import { requireAuth } from "../../middlewares/auth.middleware";

const validReactions: ReactionType[] = ["like", "dislike"];
const reactionsRouter = Router();

reactionsRouter.post("/note/:noteId", requireAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const noteId = Number(req.params.noteId);
    if (!Number.isInteger(noteId)) {
      return res.status(400).json({
        error: "Invalid type",
        message: "noteId must be a valid integer",
      });
    }
    const row = await findNoteRowById(noteId);
    if (!row) {
      return res
        .status(404)
        .json({ error: "NOTE_NOT_FOUND", message: "Note not found" });
    }

    const { reaction } = req.body ?? {};
    const safeReaction =
      typeof reaction === "string" ? reaction.trim().toLowerCase() : "";

    if (
      !safeReaction ||
      !validReactions.includes(safeReaction as ReactionType)
    ) {
      return res.status(400).json({
        error: "Invalid reaction type",
        message: `Reaction must be one of: ${validReactions.join(", ")}`,
      });
    }

    const reactionRow = await setReaction({
      noteId,
      userId: req.user!.id,
      reaction: safeReaction as ReactionType,
    });
    const reactionItem = mapReactionRowToItem(reactionRow);
    return res.status(200).json(reactionItem);
  } catch (err) {
    console.error("Failed to set reaction", err);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to set reaction",
    });
  }
});

reactionsRouter.delete("/note/:noteId", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const noteId = Number(req.params.noteId);
    if (!Number.isInteger(noteId)) {
      return res.status(400).json({
        error: "Invalid type",
        message: "noteId must be a valid integer",
      });
    }

    const row = await findNoteRowById(noteId);
    if (!row) {
      return res
        .status(404)
        .json({ error: "NOTE_NOT_FOUND", message: "Note not found" });
    }
    const deleteReaction = await deleteReactionByNoteAndUser(
      noteId,
      req.user!.id,
    );
    if (!deleteReaction) {
      return res
        .status(404)
        .json({ error: "REACTION_NOT_FOUND", message: "Reaction not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Failed to delete reaction", err);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete reaction",
    });
  }
});

export default reactionsRouter;
