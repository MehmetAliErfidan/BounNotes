import { ALLOWED_DOMAIN } from "../../../pages/constants";

export const REGISTER = {
  tr: {
    unmatchedPasswordsMessage: "Şifreler eşleşmiyor.",
    emailErrorMessage: `Sadece "${ALLOWED_DOMAIN}" uzantılı e-posta adreslerine izin verilir.`,
    passwordErrorMessage:
      "Şifre en az 8 karakter olmalı, büyük/küçük harf, rakam ve özel karakter içermeli.",
    headerText: "Ders Notu Paylaşmayı Kolaylaştıran Platform",
    namePlaceholder: "İsim",
    surnamePlaceholder: "Soyisim",
    emailPlaceholder: "Öğrenci E-posta Adresi",
    passwordPlaceholder: "Şifre",
    confirmPasswordPlaceholder: "Şifre Tekrarı",
    verifyEmailMessage:
      "Kayıttan sonra e-postanıza gelen doğrulama bağlantısını açmalısınız.",
    registerFailedMessage: "Kayıt başarısız oldu.",
    registerSuccessFallback:
      "Kayıt başarılı. Lütfen e-postanızı doğrulayın.",
    emailAlreadyInUseMessage: "Bu e-posta zaten kullanımda.",
    registeringButtonText: "Kaydediliyor...",
    registerButtonText: "Kayıt Olun",
    alreadyHaveAccountText: "Bir hesabınız var mıydı?",
    loginLink: "Giriş Yapın",
  },
  en: {
    unmatchedPasswordsMessage: "Passwords don't match.",
    emailErrorMessage: `Only email addresses ending with “${ALLOWED_DOMAIN}” are allowed.`,
    passwordErrorMessage:
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",
    headerText: "The Platform That Makes Sharing Course Notes Easy",
    namePlaceholder: "Name",
    surnamePlaceholder: "Surname",
    emailPlaceholder: "Student Email Address",
    passwordPlaceholder: "Password",
    confirmPasswordPlaceholder: "Confirm Password",
    verifyEmailMessage:
      "After registration, you must verify your email using the link we send.",
    registerFailedMessage: "Registration failed.",
    registerSuccessFallback:
      "Registration successful. Please verify your email.",
    emailAlreadyInUseMessage: "This email is already in use.",
    registeringButtonText: "Registering...",
    registerButtonText: "Register",
    alreadyHaveAccountText: "Do you already have an account?",
    loginLink: "Login",
  },
};
