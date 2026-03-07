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
  MAIL_FROM: required("MAIL_FROM"),
  RESEND_API_KEY: required("RESEND_API_KEY"),
  ALLOW_NON_BOUN_DEV_EMAILS: asBoolean(
    process.env.ALLOW_NON_BOUN_DEV_EMAILS,
  ),
};
