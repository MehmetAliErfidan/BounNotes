import { Router } from "express";
import {
  findAssetsByNoteId,
  createNoteAsset,
  deleteNoteAssetById,
} from "./note-assets.repository";
import type { AssetType } from "./note-assets.types";
import {
  mapNoteAssetRowToItem,
  mapNoteAssetRowsToItems,
} from "./note-assets.mapper";
import { findNoteRowById } from "../notes/notes.repository";

const notesAssetsRouter = Router();

notesAssetsRouter.get("/note/:noteId", async (req, res) => {
  try {
    const rawNoteId = req.params.noteId;
    const noteId = Number(rawNoteId);
    if (!Number.isInteger(noteId)) {
      return res.status(400).json({
        error: "INVALID_NOTE_ID",
        message: "noteId must be a valid number",
      });
    }
    const rows = await findAssetsByNoteId(noteId);
    const items = mapNoteAssetRowsToItems(rows);
    res.json(items);
  } catch (err) {
    console.error("Failed to parse noteId:", err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
});

notesAssetsRouter.post("/note/:noteId", async (req, res) => {
  try {
    const allowedAssetTypes: AssetType[] = ["pdf", "image"];
    const rawNoteId = req.params.noteId;
    const noteId = Number(rawNoteId);

    if (!Number.isInteger(noteId)) {
      return res.status(400).json({
        error: "INVALID_NOTE_ID",
        message: "noteId must be a valid integer",
      });
    }
    const row = await findNoteRowById(noteId);
    if (!row) {
      return res.status(404).json({ error: "Note not found" });
    }

    const { assetType, fileUrl, sortOrder } = req.body ?? {};
    const safeAssetType =
      typeof assetType === "string" ? assetType.trim().toLowerCase() : "";
    const safeFileUrl = typeof fileUrl === "string" ? fileUrl.trim() : "";
    let sortOrderNumber = 0;
    if (sortOrder !== undefined && sortOrder !== null) {
      const parsedSortOrder = Number(sortOrder);

      if (Number.isInteger(parsedSortOrder) && parsedSortOrder >= 0) {
        sortOrderNumber = parsedSortOrder;
      } else {
        return res.status(400).json({
          error: "INVALID_SORT_ORDER",
          message: "sortOrder must be an integer greater than or equal to 0",
        });
      }
    }

    if (
      !safeAssetType ||
      !allowedAssetTypes.includes(safeAssetType as AssetType)
    ) {
      return res.status(400).json({
        error: "Invalid asset type",
        message: `assetType must be one of: ${allowedAssetTypes.join(", ")}`,
      });
    }

    if (!safeFileUrl) {
      return res
        .status(400)
        .json({ error: "Invalid fileUrl", message: "fileUrl is required" });
    }

    if (safeAssetType === "pdf") {
      const existingAssets = await findAssetsByNoteId(noteId);
      const alreadyHasPdf = existingAssets.some((a) => a.asset_type === "pdf");
      if (alreadyHasPdf) {
        return res.status(409).json({
          error: "Note already has PDF",
          message: "This note already has a PDF asset",
        });
      }
    }
    const createdRow = await createNoteAsset({
      noteId,
      assetType: safeAssetType as AssetType,
      fileUrl: safeFileUrl,
      sortOrder: sortOrderNumber,
    });
    const createdItem = mapNoteAssetRowToItem(createdRow);
    return res.status(201).json(createdItem);
  } catch (err) {
    console.error("Failed to create note asset", err);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to create note asset",
    });
  }
});

notesAssetsRouter.delete("/asset/:assetId", async (req, res) => {
  const rawAssetId = req.params.assetId;
  const assetId = Number(rawAssetId);
  if (!Number.isInteger(assetId)) {
    return res.status(400).json({
      error: "INVALID_ASSET_ID",
      message: "assetId must be a valid integer",
    });
  }
  try {
    const deleteAsset = await deleteNoteAssetById(assetId);
    if (!deleteAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Failed to delete asset", err);
    return res
      .status(500)
      .json({
        error: "Internal server error",
        message: "Failed to delete asset",
      });
  }
});

export default notesAssetsRouter;
