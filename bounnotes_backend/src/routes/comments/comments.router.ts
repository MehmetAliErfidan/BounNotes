import { Router } from "express";
import { optionalAuth, requireAuth } from "../../middlewares/auth.middleware";
import {
  findNoteRowById,
  hasUserPurchasedNote,
} from "../notes/notes.repository";
import {
  createComment,
  deleteCommentById,
  findCommentById,
  findCommentsByNoteId,
} from "./comments.repository";
import { mapCommentRowToItem, mapCommentRowsToItems } from "./comments.mapper";

const commentsRouter = Router();

commentsRouter.get("/note/:noteId", optionalAuth, async (req, res) => {
  try {
    const noteId = Number(req.params.noteId);
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({ message: "Invalid noteId" });
    }

    const note = await findNoteRowById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const rows = await findCommentsByNoteId(noteId);
    return res.status(200).json(mapCommentRowsToItems(rows));
  } catch (err) {
    console.error("GET /comments/note/:noteId failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

commentsRouter.post("/note/:noteId", requireAuth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const noteId = Number(req.params.noteId);
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({ message: "Invalid noteId" });
    }
    const note = await findNoteRowById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const isOwner = Number(note.owner_id) === Number(req.user.id);
    const isPurchased = isOwner
      ? false
      : await hasUserPurchasedNote(noteId, req.user.id);

    if (!isOwner && !isPurchased) {
      return res.status(403).json({ message: "You can not comment this note" });
    }

    const rawContent =
      typeof req.body?.content === "string" ? req.body.content : "";
    const content = rawContent.trim();

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: "Comment is too long" });
    }

    const row = await createComment({
      noteId,
      userId: req.user.id,
      content,
    });

    return res.status(201).json(mapCommentRowToItem(row));
  } catch (err) {
    console.error("POST /comments/note/:noteId failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

commentsRouter.delete("/:commentId", requireAuth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const commentId = Number(req.params.commentId);
    if (!Number.isInteger(commentId) || commentId <= 0) {
      return res.status(400).json({ message: "Invalid commentId" });
    }

    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (Number(comment.user_id) !== Number(req.user.id)) {
      return res.status(403).json({ message: "Only comment owner can delete" });
    }

    const deleted = await deleteCommentById(commentId);
    if (!deleted) {
      return res.status(500).json({ message: "Failed to delete comment" });
    }

    return res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error("DELETE /comments/:commentId failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default commentsRouter;
