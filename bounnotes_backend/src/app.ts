import express from "express";
import cors from "cors";
import { env } from "./config/env";
import notesRouter from "./routes/notes/notes.router";
import notesAssetsRouter from "./routes/note-assets/note-assets.router";
import reactionsRouter from "./routes/reactions/reactions.router";
import authRouter from "./routes/auth/auth.router";
import usersRouter from "./routes/users/users.router";
import paymentsRouter from "./routes/payments/payments.router";
import commentsRouter from "./routes/comments/comments.router";

const app = express();

const allowedOrigins = new Set<string>([env.CORS_ORIGIN]);
try {
  const configured = new URL(env.CORS_ORIGIN);
  if (configured.hostname === "localhost") {
    const alt = new URL(env.CORS_ORIGIN);
    alt.hostname = "127.0.0.1";
    allowedOrigins.add(alt.origin);
  } else if (configured.hostname === "127.0.0.1") {
    const alt = new URL(env.CORS_ORIGIN);
    alt.hostname = "localhost";
    allowedOrigins.add(alt.origin);
  }
} catch {
  // Keep the configured value only if URL parsing fails.
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      // Iyzico checkout/callback flows can originate from iyzipay domains.
      if (origin.endsWith(".iyzipay.com") || origin.includes("iyzipay.com")) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/notes", notesRouter);

app.use("/api/assets", notesAssetsRouter);

app.use("/api/reactions", reactionsRouter);

app.use("/api/users", usersRouter);

app.use("/api/payments", paymentsRouter);

app.use("/api/comments", commentsRouter);

export default app;
