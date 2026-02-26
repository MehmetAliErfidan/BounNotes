import { NoteAssetItem, NoteAssetRow } from "./note-assets.types";

function toIsoString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}

export function mapNoteAssetRowToItem(row: NoteAssetRow): NoteAssetItem {
  return {
    id: row.id,
    noteId: row.note_id,
    assetType: row.asset_type,
    fileUrl: row.file_url,
    sortOrder: row.sort_order,
    createdAt: toIsoString(row.created_at),
  };
}

export function mapNoteAssetRowsToItems(rows: NoteAssetRow[]): NoteAssetItem[] {
  return rows.map(mapNoteAssetRowToItem);
}
