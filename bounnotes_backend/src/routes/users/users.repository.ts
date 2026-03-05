import pool from "../../db/pool";
import { UpdateUserProfileInput, UserProfileRow } from "./users.types";
import type { NoteListRow } from "../notes/notes.types";

const profileFieldToColumnMap: Record<keyof UpdateUserProfileInput, string> = {
  fullName: "full_name",
  department: "department",
  grade: "grade",
  favoriteCourse: "favorite_course",
  favoriteProfessor: "favorite_professor",
  favoritePlace: "favorite_place",
  about: "about",
  avatarUrl: "avatar_url",
};

export async function findMyProfileById(
  userId: number,
): Promise<UserProfileRow | null> {
  const { rows } = await pool.query<UserProfileRow>(
    `
    SELECT
      id,
      username,
      full_name,
      department,
      grade,
      favorite_course,
      favorite_professor,
      favorite_place,
      about,
      avatar_url
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [userId],
  );

  return rows[0] ?? null;
}

export async function updateMyProfileById(
  userId: number,
  input: UpdateUserProfileInput,
): Promise<UserProfileRow | null> {
  const setParts: string[] = [];
  const values: Array<string | null> = [];
  let placeholder = 2;

  for (const [field, value] of Object.entries(input) as Array<
    [keyof UpdateUserProfileInput, string | null | undefined]
  >) {
    if (value === undefined) continue;
    const column = profileFieldToColumnMap[field];
    setParts.push(`${column} = $${placeholder}`);
    values.push(value);
    placeholder += 1;
  }

  if (setParts.length === 0) {
    return findMyProfileById(userId);
  }

  const query = `
    UPDATE users
    SET
      ${setParts.join(", ")}
    WHERE id = $1
    RETURNING
      id,
      username,
      full_name,
      department,
      grade,
      favorite_course,
      favorite_professor,
      favorite_place,
      about,
      avatar_url
  `;

  const { rows } = await pool.query<UserProfileRow>(query, [userId, ...values]);
  return rows[0] ?? null;
}

export async function findPublicProfileByUsername(
  username: string,
): Promise<UserProfileRow | null> {
  const { rows } = await pool.query<UserProfileRow>(
    `
    SELECT 
    id,
    username,
    full_name,
    department,
    grade,
    favorite_course,
    favorite_professor,
    favorite_place,
    about,
    avatar_url
    FROM users
    WHERE username = $1
    LIMIT 1
    `,
    [username],
  );
  return rows[0] ?? null;
}

export async function findListedNotesByUsername(
  username: string,
): Promise<NoteListRow[]> {
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
    n.is_listed,
    n.created_at,
    u.id AS owner_id,
    u.username AS owner_username,
    n.like_count,
    n.dislike_count
    FROM notes n
    JOIN users u ON u.id = n.owner_id
    WHERE u.username = $1
      AND n.is_active = true
      AND n.is_listed = true
    ORDER BY n.created_at DESC
    `,
    [username],
  );
  return rows;
}
