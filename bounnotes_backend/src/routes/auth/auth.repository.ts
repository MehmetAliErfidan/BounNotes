import pool from "../../db/pool";
import type { UserAuthRow, RegisterInput } from "./auth.types";

export async function findUserByEmail(
  email: string,
): Promise<UserAuthRow | null> {
  const { rows } = await pool.query<UserAuthRow>(
    `
        SELECT 
        id,
        email,
        username,
        password_hash,
        is_verified,
        created_at,
        updated_at
        FROM users
        WHERE email = $1
        LIMIT 1
        `,
    [email],
  );

  return rows[0] ?? null;
}

export async function findUserByUsername(
  username: string,
): Promise<UserAuthRow | null> {
  const { rows } = await pool.query<UserAuthRow>(
    `
        SELECT 
        id,
        email,
        username,
        password_hash,
        is_verified,
        created_at,
        updated_at
        FROM users
        WHERE username = $1
        LIMIT 1
        `,
    [username],
  );

  return rows[0] ?? null;
}

export async function findUserById(id: number): Promise<UserAuthRow | null> {
  const { rows } = await pool.query<UserAuthRow>(
    `
        SELECT 
        id,
        email,
        username,
        password_hash,
        is_verified,
        created_at,
        updated_at
        FROM users
        WHERE id = $1
        LIMIT 1
        `,
    [id],
  );
  return rows[0] ?? null;
}

export async function createUser(input: RegisterInput): Promise<UserAuthRow> {
  const { email, username, passwordHash } = input;
  const { rows } = await pool.query<UserAuthRow>(
    `
        INSERT INTO users (
        email,
        username,
        password_hash)
        VALUES ($1, $2, $3)
        RETURNING
            id, 
            email,
            username,
            password_hash,
            is_verified,
            created_at,
            updated_at
        `,
    [email, username, passwordHash],
  );
  const createdUser = rows[0];
  if (!createdUser) {
    throw new Error("Failed to create user");
  }
  return createdUser;
}
