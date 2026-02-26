import { NoteReactionRow, NoteReactionItem } from "./reactions.types";

function toIsoString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}

export function mapReactionRowToItem(row: NoteReactionRow): NoteReactionItem {
  return {
    id: row.id,
    noteId: row.note_id,
    userId: row.user_id,
    reaction: row.reaction,
    createdAt: toIsoString(row.created_at),
  };
}

export function mapReactionRowsToItems(
  rows: NoteReactionRow[],
): NoteReactionItem[] {
  return rows.map(mapReactionRowToItem);
}
