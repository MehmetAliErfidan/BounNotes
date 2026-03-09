import { Router } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "../../config/env";
import {
  findUserByEmail,
  findUserByUsername,
  createUser,
  setEmailVerificationToken,
  findUserByVerificationTokenHash,
  markUserAsVerified,
} from "./auth.repository";
import { AUTH_RULES } from "../../config/auth.rules";
import { requireAuth } from "../../middlewares/auth.middleware";
import crypto from "crypto";
import { sendVerificationEmail } from "../../services/mail.service";
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const { email, name, surname, password } = req.body;

    const safeEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const safeName = typeof name === "string" ? name.trim().toLowerCase() : "";
    const safeSurname =
      typeof surname === "string" ? surname.trim().toLowerCase() : "";
    const safePassword = typeof password === "string" ? password : "";
    if (!safeEmail || !safeName || !safeSurname || !safePassword) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    if (safeName.length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters" });
    }

    if (safeSurname.length < 2) {
      return res
        .status(400)
        .json({ message: "Surname must be at least 2 characters" });
    }

    if (
      !env.ALLOW_NON_BOUN_DEV_EMAILS &&
      !safeEmail.endsWith(AUTH_RULES.ALLOWED_DOMAIN)
    ) {
      return res.status(400).json({
        message: `Only ${AUTH_RULES.ALLOWED_DOMAIN} emails are allowed`,
      });
    }

    if (!AUTH_RULES.PASSWORD_REGEX.test(safePassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    function normalizeTurkishCharacters(value: string): string {
      return value
        .replace(/ı/g, "i")
        .replace(/ş/g, "s")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u");
    }

    const rawUsername = `${safeName}.${safeSurname}`;
    let username = rawUsername.toLowerCase();
    username = normalizeTurkishCharacters(username);

    username = username
      .trim()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9._]/g, "")
      .replace(/\.{2,}/g, ".");

    if (username.startsWith(".") || username.endsWith(".")) {
      return res.status(400).json({ message: "Username format is invalid" });
    }

    const emailRow = await findUserByEmail(safeEmail);
    if (emailRow) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const baseUsername = username;
    let finalUsername: string | null = null;
    for (let i = 0; i <= 50; i++) {
      const candidate = i === 0 ? baseUsername : `${baseUsername}${i + 1}`;
      const existingUser = await findUserByUsername(candidate);
      if (!existingUser) {
        finalUsername = candidate;
        break;
      }
    }
    if (!finalUsername) {
      return res
        .status(409)
        .json({ message: "Unable to generate unique username" });
    }

    const passwordHash = await bcrypt.hash(safePassword, 10);
    const createdUser = await createUser({
      email: safeEmail,
      username: finalUsername,
      passwordHash,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await setEmailVerificationToken(
      createdUser.id,
      verificationTokenHash,
      verificationExpiresAt,
    );

    const verifyUrl = `${env.APP_BASE_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(createdUser.email, verifyUrl);

    type AccessTokenPayload = {
      sub: string;
      email: string;
      username: string;
    };

    const tokenPayload: AccessTokenPayload = {
      sub: String(createdUser.id),
      email: createdUser.email,
      username: createdUser.username,
    };

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    console.error("Internal server error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.get("/verify-email", async (req, res) => {
  try {
    const rawToken =
      typeof req.query.token === "string" ? req.query.token.trim() : "";

    if (!rawToken) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await findUserByVerificationTokenHash(tokenHash);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (!user.verification_expires_at) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const expiresAt = new Date(user.verification_expires_at);
    if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await markUserAsVerified(user.id);
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("GET /auth/verify-email failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const { email, password } = req.body;
    const safeEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const safePassword = typeof password === "string" ? password : "";

    if (!safeEmail || !safePassword) {
      return res.status(400).json({ message: "Invalid input" });
    }

    if (
      !env.ALLOW_NON_BOUN_DEV_EMAILS &&
      !safeEmail.endsWith(AUTH_RULES.ALLOWED_DOMAIN)
    ) {
      return res.status(400).json({
        message: `Only ${AUTH_RULES.ALLOWED_DOMAIN} emails are allowed`,
      });
    }

    const user = await findUserByEmail(safeEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const matchedPassword = await bcrypt.compare(
      safePassword,
      user.password_hash,
    );
    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!env.ALLOW_NON_BOUN_DEV_EMAILS && !user.is_verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const existingUser = user;

    type AccessTokenPayload = {
      sub: string;
      email: string;
      username: string;
    };

    const tokenPayload: AccessTokenPayload = {
      sub: String(existingUser.id),
      email: existingUser.email,
      username: existingUser.username,
    };
    const accessToken = jwt.sign(tokenPayload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as StringValue,
    });

    const responseUser = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      isVerified: existingUser.is_verified,
    };

    return res.status(200).json({ token: accessToken, user: responseUser });
  } catch (err) {
    console.error("Internal server error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.get("/me", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Internal server error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;
