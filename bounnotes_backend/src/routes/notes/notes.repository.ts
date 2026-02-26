import pool from "../../db/pool";
import { CreateNoteInput, NoteListRow, UpdateNoteInput } from "./notes.types";

export async function findAllNotesRows(): Promise<NoteListRow[]> {
  const { rows } = await pool.query<NoteListRow>(`
    SELECT
      n.id,
      n.title,
      n.course,
      n.term,
      n.year,
      n.teacher,
      n.description,
      n.price,
      n.created_at,
      u.id AS owner_id,
      u.username AS owner_username,
      n.like_count,
      n.dislike_count
    FROM notes n
    JOIN users u ON u.id = n.owner_id
    WHERE n.is_active = true
    AND n.is_listed = true
    ORDER BY n.created_at DESC
  `);

  return rows;
}

export async function findNoteRowById(id: number): Promise<NoteListRow | null> {
  const { rows } = await pool.query<NoteListRow>(
    `
  SELECT 
  n.id,
  n.title,
  n.course,
  n.term,
  n.year,
  n.teacher,
  n.description,
  n.price,
  n.created_at,
  u.id AS owner_id,
  u.username AS owner_username,
  n.like_count,
  n.dislike_count
  FROM notes n
  JOIN users u ON u.id = n.owner_id
  WHERE n.id = $1
    AND n.is_active = true
  LIMIT 1
  `,
    [id],
  );

  return rows[0] ?? null;
}

export async function createNote(input: CreateNoteInput): Promise<NoteListRow> {
  const { rows } = await pool.query<{ id: number }>(
    `
    INSERT INTO notes (
      owner_id,
      title,
      course,
      term,
      year,
      teacher,
      description,
      price
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
    `,
    [
      input.ownerId,
      input.title,
      input.course,
      input.term,
      input.year,
      input.teacher,
      input.description,
      input.price,
    ],
  );

  const createdId = rows[0]?.id;
  if (!createdId) {
    throw new Error("Failed to create note");
  }

  const note = await findNoteRowById(createdId);
  if (!note) {
    throw new Error("Created note could not be reloaded");
  }

  return note;
}

export async function updateNoteById(
  id: number,
  input: UpdateNoteInput,
): Promise<NoteListRow | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 2;

  for (const [key, value] of Object.entries(input)) {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  if (fields.length === 0) {
    return findNoteRowById(id);
  }
  const query = `
    UPDATE notes
    SET
      ${fields.join(", ")},
      updated_at = NOW()
    WHERE id = $1
      AND is_active = true
    RETURNING id
  `;

  const { rows } = await pool.query<{ id: number }>(query, [id, ...values]);

  const updatedId = rows[0]?.id;
  if (!updatedId) {
    return null;
  }

  return findNoteRowById(updatedId);
}

export async function delistNoteById(id: number): Promise<boolean> {
  const { rows } = await pool.query<{ id: number }>(
    `
    UPDATE notes
    SET
      is_listed = false,
      updated_at = NOW()
    WHERE id = $1
      AND is_active = true
    RETURNING id
    `,
    [id],
  );

  return Boolean(rows[0]);
}
