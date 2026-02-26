import { NoteListItem, NoteListRow } from "./notes.types";

function toIsoString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
}

export function mapNoteRowToNoteListItem(row: NoteListRow): NoteListItem {
  return {
    id: row.id,
    title: row.title,
    course: row.course,
    term: row.term,
    year: row.year,
    teacher: row.teacher,
    description: row.description,
    price: Number(row.price),
    createdAt: toIsoString(row.created_at),
    owner: {
      id: row.owner_id,
      username: row.owner_username,
    },
    stats: {
      likeCount: row.like_count,
      dislikeCount: row.dislike_count,
    },
  };
}

export function mapNoteRowsToNoteListItems(rows: NoteListRow[]): NoteListItem[] {
  return rows.map(mapNoteRowToNoteListItem);
}
