function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function asBoolean(value: string | undefined): boolean {
  return value === "true";
}

function asList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const env = {
  PORT: Number(process.env.PORT || 3000),

  DB_HOST: required("DB_HOST"),
  DB_PORT: Number(required("DB_PORT")),
  DB_NAME: required("DB_NAME"),
  DB_USER: required("DB_USER"),
  DB_PASSWORD: required("DB_PASSWORD"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  APP_BASE_URL: required("APP_BASE_URL"),
  CORS_ORIGIN: process.env.CORS_ORIGIN || required("APP_BASE_URL"),
  CORS_ORIGINS: asList(process.env.CORS_ORIGINS),
  MAIL_FROM: required("MAIL_FROM"),
  RESEND_API_KEY: required("RESEND_API_KEY"),
  ALLOW_NON_BOUN_DEV_EMAILS: asBoolean(process.env.ALLOW_NON_BOUN_DEV_EMAILS),
  IYZICO_API_KEY: required("IYZICO_API_KEY"),
  IYZICO_SECRET_KEY: required("IYZICO_SECRET_KEY"),
  IYZICO_BASE_URL: required("IYZICO_BASE_URL"),
  PAYMENT_SUCCESS_URL: required("PAYMENT_SUCCESS_URL"),
  PAYMENT_CANCEL_URL: required("PAYMENT_CANCEL_URL"),
  BACKEND_BASE_URL: required("BACKEND_BASE_URL"),
};
