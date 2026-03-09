import type { NoteCommentItem, NoteCommentRow } from "./comments.types";

export function mapCommentRowToItem(row: NoteCommentRow): NoteCommentItem {
  return {
    id: row.id,
    noteId: row.note_id,
    userId: row.user_id,
    username: row.username,
    content: row.content,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export function mapCommentRowsToItems(
  rows: NoteCommentRow[],
): NoteCommentItem[] {
  return rows.map(mapCommentRowToItem);
}
