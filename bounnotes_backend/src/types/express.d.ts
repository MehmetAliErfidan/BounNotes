import type { AuthUser } from "../routes/auth/auth.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

export {};
