import express, { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  findAssetsByNoteId,
  findAssetById,
  createNoteAsset,
  deleteNoteAssetById,
} from "./note-assets.repository";
import type { AssetType, NoteAssetRow } from "./note-assets.types";
import {
  mapNoteAssetRowToItem,
  mapNoteAssetRowsToItems,
} from "./note-assets.mapper";
import {
  findNoteRowById,
  hasUserPurchasedNote,
} from "../notes/notes.repository";
import { requireAuth } from "../../middlewares/auth.middleware";

const notesAssetsRouter = Router();
const UPLOAD_ROOT = path.resolve(process.cwd(), "uploads", "note-assets");
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const UPLOAD_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const UPLOAD_RATE_LIMIT_MAX_REQUESTS = 20;
const uploadBuckets = new Map<number, { count: number; resetAt: number }>();

function resolveAssetType(
  rawAssetType: unknown,
): { ok: true; value: AssetType } | { ok: false; message: string } {
  const safeAssetType =
    typeof rawAssetType === "string" ? rawAssetType.trim().toLowerCase() : "";
  if (
    !safeAssetType ||
    (safeAssetType !== "pdf" && safeAssetType !== "image")
  ) {
    return { ok: false, message: "assetType must be one of: pdf, image" };
  }
  return { ok: true, value: safeAssetType };
}

function validateUploadMime(assetType: AssetType, mime: string): boolean {
  if (assetType === "pdf") return mime === "application/pdf";
  return mime.startsWith("image/");
}

function hasPdfSignature(buffer: Buffer): boolean {
  if (buffer.length < 5) return false;
  return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
}

function hasImageSignatureOrSvg(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;

  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isGif =
    buffer.subarray(0, 6).toString("ascii") === "GIF87a" ||
    buffer.subarray(0, 6).toString("ascii") === "GIF89a";
  const isWebp =
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP";
  const isBmp = buffer.subarray(0, 2).toString("ascii") === "BM";

  if (isPng || isJpeg || isGif || isWebp || isBmp) {
    return true;
  }

  const textHead = buffer.subarray(0, Math.min(buffer.length, 512)).toString("utf8");
  const trimmed = textHead.trimStart();
  return trimmed.startsWith("<svg") || trimmed.startsWith("<?xml");
}

function validateFileSignature(assetType: AssetType, fileBuffer: Buffer): boolean {
  if (assetType === "pdf") {
    return hasPdfSignature(fileBuffer);
  }

  return hasImageSignatureOrSvg(fileBuffer);
}

function isUploadRateLimited(userId: number): boolean {
  const now = Date.now();
  const existing = uploadBuckets.get(userId);
  if (!existing || existing.resetAt <= now) {
    uploadBuckets.set(userId, {
      count: 1,
      resetAt: now + UPLOAD_RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= UPLOAD_RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  uploadBuckets.set(userId, existing);
  return false;
}

function resolveAbsoluteAssetFilePath(fileUrl: string): string | null {
  if (!fileUrl.startsWith("/uploads/note-assets/")) {
    return null;
  }

  const uploadsRoot = path.resolve(process.cwd(), "uploads", "note-assets");
  const absoluteFilePath = path.resolve(process.cwd(), fileUrl.slice(1));
  if (!absoluteFilePath.startsWith(uploadsRoot)) {
    return null;
  }

  return absoluteFilePath;
}

function buildFileExt(assetType: AssetType, fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  if (assetType === "pdf") {
    return ext === ".pdf" ? ".pdf" : ".pdf";
  }
  const allowedImageExt = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".bmp",
    ".svg",
    ".heic",
    ".heif",
  ]);
  return allowedImageExt.has(ext) ? ext : ".bin";
}

notesAssetsRouter.get("/note/:noteId", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const noteId = Number(req.params.noteId);
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({
        error: "INVALID_NOTE_ID",
        message: "noteId must be a valid integer",
      });
    }

    const noteRow = await findNoteRowById(noteId);
    if (!noteRow) {
      return res.status(404).json({ error: "Note not found" });
    }

    const isOwner = Number(noteRow.owner_id) === req.user.id;
    if (!isOwner) {
      const isPurchased = await hasUserPurchasedNote(noteId, req.user.id);
      if (!isPurchased) {
        return res.status(403).json({
          error: "FORBIDDEN",
          message: "You do not have access to this note assets",
        });
      }
    }

    const rows = await findAssetsByNoteId(noteId);
    const items = mapNoteAssetRowsToItems(rows);
    return res.json(items);
  } catch (err) {
    console.error("Failed to fetch note assets:", err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
});

notesAssetsRouter.post(
  "/note/:noteId/upload",
  requireAuth,
  express.raw({ type: "*/*", limit: MAX_UPLOAD_BYTES }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (isUploadRateLimited(req.user.id)) {
        return res.status(429).json({
          error: "RATE_LIMITED",
          message: "Too many upload requests. Please retry in a minute.",
        });
      }

      const rawNoteId = req.params.noteId;
      const noteId = Number(rawNoteId);
      if (!Number.isInteger(noteId)) {
        return res.status(400).json({
          error: "INVALID_NOTE_ID",
          message: "noteId must be a valid integer",
        });
      }

      const noteRow = await findNoteRowById(noteId);
      if (!noteRow) {
        return res.status(404).json({ error: "Note not found" });
      }
      const ownerId = Number(noteRow.owner_id);
      if (!Number.isInteger(ownerId) || ownerId !== req.user.id) {
        return res.status(403).json({
          error: "FORBIDDEN",
          message: "Only the note owner can upload assets",
        });
      }

      const assetTypeCheck = resolveAssetType(req.header("x-asset-type"));
      if (!assetTypeCheck.ok) {
        return res.status(400).json({
          error: "INVALID_ASSET_TYPE",
          message: assetTypeCheck.message,
        });
      }
      const assetType = assetTypeCheck.value;

      const sortOrderHeader = req.header("x-sort-order");
      const sortOrder = sortOrderHeader ? Number(sortOrderHeader) : 0;
      if (!Number.isInteger(sortOrder) || sortOrder < 0) {
        return res.status(400).json({
          error: "INVALID_SORT_ORDER",
          message: "x-sort-order must be an integer greater than or equal to 0",
        });
      }

      const mime = req.header("content-type") ?? "";
      if (!validateUploadMime(assetType, mime)) {
        return res.status(400).json({
          error: "INVALID_CONTENT_TYPE",
          message:
            assetType === "pdf"
              ? "PDF uploads require Content-Type: application/pdf"
              : "Image uploads require Content-Type: image/*",
        });
      }

      const fileBuffer = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
      if (fileBuffer.length === 0) {
        return res.status(400).json({
          error: "EMPTY_FILE",
          message: "Request body must contain file bytes",
        });
      }
      if (!validateFileSignature(assetType, fileBuffer)) {
        return res.status(400).json({
          error: "INVALID_FILE_SIGNATURE",
          message:
            assetType === "pdf"
              ? "Uploaded file is not a valid PDF binary"
              : "Uploaded file is not a valid supported image binary",
        });
      }

      if (assetType === "pdf") {
        const existingAssets = await findAssetsByNoteId(noteId);
        const alreadyHasPdf = existingAssets.some(
          (a) => a.asset_type === "pdf",
        );
        if (alreadyHasPdf) {
          return res.status(409).json({
            error: "Note already has PDF",
            message: "This note already has a PDF asset",
          });
        }
      }

      const rawFilename = req.header("x-file-name") ?? "asset";
      let decodedName = rawFilename;
      try {
        decodedName = decodeURIComponent(rawFilename);
      } catch {
        decodedName = rawFilename;
      }
      const extension = buildFileExt(assetType, decodedName);
      const fileName = `${assetType}-${Date.now()}-${randomUUID()}${extension}`;
      const noteDir = path.join(UPLOAD_ROOT, String(noteId));
      let absoluteFilePath = "";

      await fs.mkdir(noteDir, { recursive: true });
      absoluteFilePath = path.join(noteDir, fileName);
      await fs.writeFile(absoluteFilePath, fileBuffer);

      const fileUrl = `/uploads/note-assets/${noteId}/${fileName}`;
      let createdRow: NoteAssetRow;
      try {
        createdRow = await createNoteAsset({
          noteId,
          assetType,
          fileUrl,
          sortOrder,
        });
      } catch (dbErr) {
        await fs.unlink(absoluteFilePath).catch(() => undefined);
        throw dbErr;
      }
      const createdItem = mapNoteAssetRowToItem(createdRow);
      return res.status(201).json(createdItem);
    } catch (err) {
      console.error("Failed to upload note asset", {
        userId: req.user?.id,
        noteId: req.params.noteId,
        error: err,
      });
      return res.status(500).json({
        error: "Internal server error",
        message: "Failed to upload note asset",
      });
    }
  },
);

notesAssetsRouter.get("/asset/:assetId/file", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const assetId = Number(req.params.assetId);
    if (!Number.isInteger(assetId) || assetId <= 0) {
      return res.status(400).json({
        error: "INVALID_ASSET_ID",
        message: "assetId must be a valid integer",
      });
    }

    const assetRow = await findAssetById(assetId);
    if (!assetRow) {
      return res.status(404).json({ error: "Asset not found" });
    }

    const noteId = Number(assetRow.note_id);
    const noteRow = await findNoteRowById(noteId);
    if (!noteRow) {
      return res.status(404).json({ error: "Note not found" });
    }
    const isOwner = Number(noteRow.owner_id) === req.user.id;
    if (!isOwner) {
      const isPurchased = await hasUserPurchasedNote(noteId, req.user.id);
      if (!isPurchased) {
        return res.status(403).json({
          error: "FORBIDDEN",
          message: "You do not have access to this file",
        });
      }
    }

    const absoluteFilePath = resolveAbsoluteAssetFilePath(assetRow.file_url);
    if (!absoluteFilePath) {
      return res
        .status(400)
        .json({ error: "INVALID_FILE_URL", message: "Unsupported file path" });
    }
    try {
      await fs.access(absoluteFilePath);
    } catch {
      return res.status(404).json({
        error: "ASSET_FILE_NOT_FOUND",
        message: "Asset file was not found on disk",
      });
    }
    return res.sendFile(absoluteFilePath);
  } catch (err) {
    console.error("Failed to serve asset file", {
      userId: req.user?.id,
      assetId: req.params.assetId,
      error: err,
    });
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to serve asset file",
    });
  }
});

notesAssetsRouter.delete("/asset/:assetId", requireAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const rawAssetId = req.params.assetId;
  const assetId = Number(rawAssetId);
  if (!Number.isInteger(assetId) || assetId <= 0) {
    return res.status(400).json({
      error: "INVALID_ASSET_ID",
      message: "assetId must be a valid integer",
    });
  }
  try {
    const assetRow = await findAssetById(assetId);
    if (!assetRow) {
      return res.status(404).json({ error: "Asset not found" });
    }

    const noteId = Number(assetRow.note_id);
    const noteRow = await findNoteRowById(noteId);
    if (!noteRow) {
      return res.status(404).json({ error: "Note not found" });
    }

    const ownerId = Number(noteRow.owner_id);
    if (!Number.isInteger(ownerId) || ownerId !== req.user.id) {
      return res.status(403).json({
        error: "FORBIDDEN",
        message: "Only the note owner can delete assets",
      });
    }

    const deleteAsset = await deleteNoteAssetById(assetId);
    if (!deleteAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    const absoluteFilePath = resolveAbsoluteAssetFilePath(assetRow.file_url);
    if (absoluteFilePath) {
      await fs.unlink(absoluteFilePath).catch(() => undefined);
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Failed to delete asset", {
      userId: req.user.id,
      assetId: req.params.assetId,
      error: err,
    });
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete asset",
    });
  }
});

export default notesAssetsRouter;
