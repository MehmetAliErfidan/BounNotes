const ACCESS_TOKEN_KEY = "accessToken";

type AccessTokenUser = {
  id: string;
  username: string;
};

type DecodedJwtPayload = {
  sub?: unknown;
  username?: unknown;
  exp?: unknown;
};

export function getAccessToken(): string | null {
  const sessionToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  return sessionToken || localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string, rememberMe: boolean): void {
  if (!token) return;

  if (rememberMe) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

function decodeJwtPayload(token: string): DecodedJwtPayload | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;

  const payload = parts[1];
  if (!payload || typeof atob !== "function") return null;

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padLength = (4 - (normalized.length % 4)) % 4;
    const base64 = `${normalized}${"=".repeat(padLength)}`;
    const decoded = atob(base64);
    return JSON.parse(decoded) as DecodedJwtPayload;
  } catch {
    return null;
  }
}

export function getUserFromAccessToken(): AccessTokenUser | null {
  const token = getAccessToken();
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  if (typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()) {
    return null;
  }

  if (typeof payload.sub !== "string" || typeof payload.username !== "string") {
    return null;
  }

  return {
    id: payload.sub,
    username: payload.username,
  };
}
