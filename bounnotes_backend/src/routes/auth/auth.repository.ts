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

export async function setEmailVerificationToken(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<void> {
  await pool.query(
    `
      UPDATE users
      SET
        verification_token_hash = $2,
        verification_expires_at = $3
      WHERE id = $1
    `,
    [userId, tokenHash, expiresAt],
  );
}

export async function findUserByVerificationTokenHash(
  tokenHash: string,
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
      verification_token_hash,
      verification_expires_at
    FROM users
    WHERE verification_token_hash = $1
    LIMIT 1
    `,
    [tokenHash],
  );
  return rows[0] ?? null;
}

export async function markUserAsVerified(userId: number): Promise<void> {
  await pool.query(
    `
    UPDATE users
    SET
      is_verified = true,
      verification_token_hash = NULL,
      verification_expires_at = NULL
    WHERE id = $1
    `,
    [userId],
  );
}
