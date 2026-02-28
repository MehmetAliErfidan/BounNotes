export const AUTH_RULES = {
  ALLOWED_DOMAIN: "std.bogazici.edu.tr",
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&.,;:_])[A-Za-z\d$!%*?&.,;:_]{8,}$/,
  FORBIDDEN_CHARS: ["ç", "ğ", "ı", "ö", "ş", "ü"],
};
