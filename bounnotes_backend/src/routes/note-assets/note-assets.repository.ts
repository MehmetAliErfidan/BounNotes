import pool from "../../db/pool";
import { CreateNoteAssetInput, NoteAssetRow } from "./note-assets.types";

export async function findAssetsByNoteId(
  noteId: number,
): Promise<NoteAssetRow[]> {
  const { rows } = await pool.query<NoteAssetRow>(
    `
    SELECT
      id,
      note_id,
      asset_type,
      file_url,
      sort_order,
      created_at
    FROM note_assets
    WHERE note_id = $1
    ORDER BY sort_order ASC, created_at ASC
    `,
    [noteId],
  );

  return rows;
}

export async function findAssetById(
  assetId: number,
): Promise<NoteAssetRow | null> {
  const { rows } = await pool.query<NoteAssetRow>(
    `
    SELECT 
    id,
    note_id,
    asset_type,
    file_url,
    sort_order,
    created_at
    FROM note_assets
    WHERE id = $1
    LIMIT 1
    `,
    [assetId],
  );
  return rows[0] ?? null;
}

export async function createNoteAsset(
  input: CreateNoteAssetInput,
): Promise<NoteAssetRow> {
  const { rows } = await pool.query<NoteAssetRow>(
    `
    INSERT INTO note_assets (
      note_id,
      asset_type,
      file_url,
      sort_order
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      note_id,
      asset_type,
      file_url,
      sort_order,
      created_at
    `,
    [input.noteId, input.assetType, input.fileUrl, input.sortOrder],
  );

  const createdAsset = rows[0];
  if (!createdAsset) {
    throw new Error("Failed to create note asset");
  }

  return createdAsset;
}

export async function deleteNoteAssetById(assetId: number): Promise<boolean> {
  const { rows } = await pool.query<{ id: number }>(
    `
    DELETE FROM note_assets
    WHERE id = $1
    RETURNING id
    `,
    [assetId],
  );

  return Boolean(rows[0]);
}

export async function countAssetsByNoteAndType(
  noteId: number,
  assetType: "pdf" | "image",
): Promise<number> {
  const { rows } = await pool.query<{ count: string }>(
    `
    SELECT COUNT(*)::text AS count
    FROM note_assets
    WHERE note_id = $1
      AND asset_type = $2
    `,
    [noteId, assetType],
  );
  return Number(rows[0]?.count ?? "00");
}

export async function countCompletedPurchasesByNoteId(
  noteId: number,
): Promise<number> {
  const { rows } = await pool.query<{ count: string }>(
    ` 
    SELECT COUNT(*)::text AS count
    FROM note_purchases
    WHERE note_id = $1
      AND status = 'completed'
    `,
    [noteId],
  );
  return Number(rows[0]?.count ?? "0");
}
