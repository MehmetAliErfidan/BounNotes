import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthTokenPayload } from "../routes/auth/auth.types";

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.sub === "string" &&
    typeof payload.email === "string" &&
    typeof payload.username === "string"
  );
}

function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return null;
  }

  return token;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!isAuthTokenPayload(decoded)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = Number(decoded.sub);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = {
      id: userId,
      email: decoded.email,
      username: decoded.username,
    };

    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
