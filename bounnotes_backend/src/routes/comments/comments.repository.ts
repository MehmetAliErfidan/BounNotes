import pool from "../../db/pool";
import type { CreateCommentInput, NoteCommentRow } from "./comments.types";

export async function findCommentsByNoteId(
  noteId: number,
): Promise<NoteCommentRow[]> {
  const { rows } = await pool.query<NoteCommentRow>(
    `
            SELECT
            c.id,
            c.note_id,
            c.user_id,
            u.username,
            c.content,
            c.created_at,
            c.updated_at
            FROM note_comments c
            INNER JOIN users u ON u.id = c.user_id
            WHERE c.note_id = $1
            ORDER BY c.created_at DESC
        `,
    [noteId],
  );
  return rows;
}

export async function createComment(
  input: CreateCommentInput,
): Promise<NoteCommentRow> {
  const { rows } = await pool.query<NoteCommentRow>(
    ` 
         INSERT INTO note_comments (note_id, user_id, content)
         VALUES ($1, $2, $3)
         RETURNING
            id,
            note_id,
            user_id,
            (SELECT username FROM users WHERE id = user_id) AS username,
            content,
            created_at,
            updated_at
        `,
    [input.noteId, input.userId, input.content],
  );
  const row = rows[0];
  if (!row) throw new Error("Failed to create comment");
  return row;
}

export async function deleteCommentById(commentId: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    `DELETE FROM note_comments WHERE id=$1`,
    [commentId],
  );
  return Number(rowCount) > 0;
}

export async function findCommentById(
  commentId: number,
): Promise<NoteCommentRow | null> {
  const { rows } = await pool.query<NoteCommentRow>(
    ` 
        SELECT 
            c.id,
            c.note_id,
            c.user_id,
            u.username,
            c.content,
            c.created_at,
            c.updated_at
        FROM note_comments c
        INNER JOIN users u ON u.id = c.user_id
        WHERE c.id = $1
        LIMIT 1
         `,
    [commentId],
  );
  return rows[0] ?? null;
}
