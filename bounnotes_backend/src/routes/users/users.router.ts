import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  findMyProfileById,
  updateMyProfileById,
  findPublicProfileByUsername,
  findListedNotesByUsername,
} from "./users.repository";
import { mapNoteRowsToNoteListItems } from "../notes/notes.mapper";
import type {
  UpdateUserProfileInput,
  UserProfileItem,
  UserProfileRow,
} from "./users.types";

const usersRouter = Router();

const MAX_TEXT_LENGTH = {
  fullName: 120,
  department: 120,
  grade: 40,
  favoriteCourse: 120,
  favoriteProfessor: 120,
  favoritePlace: 120,
  about: 500,
  avatarUrl: 300,
} as const;

function mapUserProfileRowToItem(row: UserProfileRow): UserProfileItem {
  return {
    id: row.id,
    username: row.username,
    profile: {
      fullName: row.full_name,
      department: row.department,
      grade: row.grade,
      favoriteCourse: row.favorite_course,
      favoriteProfessor: row.favorite_professor,
      favoritePlace: row.favorite_place,
      about: row.about,
      avatarUrl: row.avatar_url,
    },
  };
}

function normalizeOptionalText(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

usersRouter.get("/me/profile", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const row = await findMyProfileById(req.user.id);
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(mapUserProfileRowToItem(row));
  } catch (err) {
    console.error("GET /users/me/profile failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.put("/me/profile", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const body = req.body ?? {};
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const allowedFields: Array<keyof UpdateUserProfileInput> = [
      "fullName",
      "department",
      "grade",
      "favoriteCourse",
      "favoriteProfessor",
      "favoritePlace",
      "about",
      "avatarUrl",
    ];

    const unknownFields = Object.keys(body).filter(
      (k) => !allowedFields.includes(k as keyof UpdateUserProfileInput),
    );
    if (unknownFields.length > 0) {
      return res.status(400).json({
        error: "Unknown profile fields",
        message: `Unknown fields: ${unknownFields.join(", ")}`,
      });
    }
    const input: UpdateUserProfileInput = {
      fullName: normalizeOptionalText(body.fullName),
      department: normalizeOptionalText(body.department),
      grade: normalizeOptionalText(body.grade),
      favoriteCourse: normalizeOptionalText(body.favoriteCourse),
      favoriteProfessor: normalizeOptionalText(body.favoriteProfessor),
      favoritePlace: normalizeOptionalText(body.favoritePlace),
      about: normalizeOptionalText(body.about),
      avatarUrl: normalizeOptionalText(body.avatarUrl),
    };

    const invalidTypeKeys = allowedFields.filter((field) => {
      if (!(field in body)) return false;
      return input[field] === undefined;
    });
    if (invalidTypeKeys.length > 0) {
      return res.status(400).json({
        error: "Invalid input types",
        message: `These fields must be string/null when provided: ${invalidTypeKeys.join(", ")}`,
      });
    }

    const hasAnyField = Object.values(input).some((v) => v !== undefined);
    if (!hasAnyField) {
      return res.status(400).json({
        error: "No profile fields provided",
      });
    }

    for (const [field, value] of Object.entries(input) as Array<
      [keyof UpdateUserProfileInput, string | null | undefined]
    >) {
      if (typeof value !== "string") continue;
      const max = MAX_TEXT_LENGTH[field];
      if (value.length > max) {
        return res.status(400).json({
          error: `${field} is too long`,
          message: `${field} must be at most ${max} characters`,
        });
      }
    }

    const updated = await updateMyProfileById(req.user.id, input);
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(mapUserProfileRowToItem(updated));
  } catch (err) {
    console.error("PUT /users/me/profile failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/:username/public-profile", async (req, res) => {
  try {
    const username =
      typeof req.params.username === "string" ? req.params.username.trim() : "";
    if (!username) {
      return res.status(400).json({ error: "Invalid username" });
    }
    const row = await findPublicProfileByUsername(username);
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(mapUserProfileRowToItem(row));
  } catch (err) {
    console.error("GET /users/:username/public-profile failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/:username/notes", async (req, res) => {
  try {
    const username =
      typeof req.params.username === "string" ? req.params.username.trim() : "";
    if (!username) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const rows = await findListedNotesByUsername(username);
    return res.status(200).json(mapNoteRowsToNoteListItems(rows));
  } catch (err) {
    console.error("GET /users/:username/notes failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;
