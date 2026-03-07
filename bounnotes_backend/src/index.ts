import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { env } from "./config/env";
import pool from "./db/pool";
import app from "./app";

async function bootstrap() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ db connection is successful!");
    app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed!", error);
    process.exit(1);
  }
}

bootstrap();
