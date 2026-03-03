import { getAccessToken } from "./authStorage";

export function buildOptionalAuthHeaders(
  initHeaders?: HeadersInit,
): HeadersInit {
  const headers = new Headers(initHeaders);
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}
