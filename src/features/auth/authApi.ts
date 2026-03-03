import { API_BASE_URL } from "../../config/api";
import { buildOptionalAuthHeaders } from "./authRequest";

type LoginResponse = {
  token: string;
  user: {
    id: string | number;
    username: string;
  };
};

type MeResponse = {
  user: {
    id: string | number;
    username: string;
    email?: string;
  };
};

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function meRequest() {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: buildOptionalAuthHeaders(),
  });
  return res;
}

export async function parseLoginResponse(
  res: Response,
): Promise<LoginResponse> {
  return (await res.json()) as LoginResponse;
}

export async function parseMeResponse(res: Response): Promise<MeResponse> {
  return (await res.json()) as MeResponse;
}
