// Auth module types: DB rows, JWT payload, request/response DTOs

export type AuthUser = {
  id: number;
  email: string;
  username: string;
};

export type UserAuthRow = {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  is_verified: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

export type RegisterInput = {
  email: string;
  username: string;
  passwordHash: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResponseUser = {
  id: number;
  email: string;
  username: string;
  isVerified: boolean;
};

export type AuthTokenPayload = {
  sub: string;
  email: string;
  username: string;
};
