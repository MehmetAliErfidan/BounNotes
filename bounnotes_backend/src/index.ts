import dotenv from "dotenv";
dotenv.config();

import { env } from "./config/env";

import express from "express";
import pool from "./db/pool";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ db connection is successfull!");
    app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed!", error);
    process.exit(1);
  }
}

bootstrap();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
