import pool from "../../db/pool";
import type { PoolClient } from "pg";
import type { NoteReactionRow, SetReactionInput } from "./reactions.types";

type ReactionCountsRow = {
  like_count: string | number | null;
  dislike_count: string | number | null;
};

export async function findReactionByNoteAndUser(
  noteId: number,
  userId: number,
): Promise<NoteReactionRow | null> {
  const { rows } = await pool.query<NoteReactionRow>(
    `
    SELECT
      id,
      note_id,
      user_id,
      reaction,
      created_at
    FROM note_reactions
    WHERE note_id = $1 AND user_id = $2
    LIMIT 1
    `,
    [noteId, userId],
  );

  return rows[0] ?? null;
}

async function syncNoteReactionCounts(noteId: number): Promise<void> {
  const { rows } = await pool.query<ReactionCountsRow>(
    `
    SELECT
      COALESCE(SUM(CASE WHEN reaction = 'like' THEN 1 ELSE 0 END), 0) AS like_count,
      COALESCE(SUM(CASE WHEN reaction = 'dislike' THEN 1 ELSE 0 END), 0) AS dislike_count
    FROM note_reactions
    WHERE note_id = $1
    `,
    [noteId],
  );

  const counts = rows[0] ?? { like_count: 0, dislike_count: 0 };
  const likeCount = Number(counts.like_count ?? 0);
  const dislikeCount = Number(counts.dislike_count ?? 0);

  await pool.query(
    `
    UPDATE notes
    SET
      like_count = $2,
      dislike_count = $3,
      updated_at = NOW()
    WHERE id = $1
      AND is_active = true
    `,
    [noteId, likeCount, dislikeCount],
  );
}

async function syncNoteReactionCountsWithClient(
  client: PoolClient,
  noteId: number,
): Promise<void> {
  const { rows } = await client.query<ReactionCountsRow>(
    `
    SELECT
      COALESCE(SUM(CASE WHEN reaction = 'like' THEN 1 ELSE 0 END), 0) AS like_count,
      COALESCE(SUM(CASE WHEN reaction = 'dislike' THEN 1 ELSE 0 END), 0) AS dislike_count
    FROM note_reactions
    WHERE note_id = $1
    `,
    [noteId],
  );

  const counts = rows[0] ?? { like_count: 0, dislike_count: 0 };
  const likeCount = Number(counts.like_count ?? 0);
  const dislikeCount = Number(counts.dislike_count ?? 0);

  await client.query(
    `
    UPDATE notes
    SET
      like_count = $2,
      dislike_count = $3,
      updated_at = NOW()
    WHERE id = $1
      AND is_active = true
    `,
    [noteId, likeCount, dislikeCount],
  );
}

export async function setReaction(
  input: SetReactionInput,
): Promise<NoteReactionRow> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Serialize reaction writes per note to keep cached counters consistent.
    await client.query(
      `
      SELECT id
      FROM notes
      WHERE id = $1 AND is_active = true
      FOR UPDATE
      `,
      [input.noteId],
    );

    const { rows } = await client.query<NoteReactionRow>(
      `
      INSERT INTO note_reactions (note_id, user_id, reaction)
      VALUES ($1, $2, $3)
      ON CONFLICT (note_id, user_id)
      DO UPDATE SET reaction = EXCLUDED.reaction
      RETURNING
        id,
        note_id,
        user_id,
        reaction,
        created_at
      `,
      [input.noteId, input.userId, input.reaction],
    );

    const reactionRow = rows[0];
    if (!reactionRow) {
      throw new Error("Failed to set reaction");
    }

    await syncNoteReactionCountsWithClient(client, input.noteId);
    await client.query("COMMIT");
    return reactionRow;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteReactionByNoteAndUser(
  noteId: number,
  userId: number,
): Promise<boolean> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      SELECT id
      FROM notes
      WHERE id = $1 AND is_active = true
      FOR UPDATE
      `,
      [noteId],
    );

    const { rows } = await client.query<{ id: number }>(
      `
      DELETE FROM note_reactions
      WHERE note_id = $1 AND user_id = $2
      RETURNING id
      `,
      [noteId, userId],
    );

    const deleted = Boolean(rows[0]);
    if (deleted) {
      await syncNoteReactionCountsWithClient(client, noteId);
    }

    await client.query("COMMIT");
    return deleted;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
