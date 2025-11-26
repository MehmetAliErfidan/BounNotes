import { ALLOWED_DOMAIN } from "../../../pages/constants";

export const REGISTER = {
  tr: {
    unmatchedPasswordsMessage: "Şifreler eşleşmiyor.",
    emailErrorMessage: `Sadece "${ALLOWED_DOMAIN}" uzantılı e-posta adreslerine izin verilir.`,
    passwordErrorMessage:
      "Şifre en az 8 karakter olmalı, büyük/küçük harf, rakam ve özel karakter içermeli.",
    codeSentAlert: "Doğrulama kodu e-postana gönderildi!",
    headerText: "Ders Notu Paylaşmayı Kolaylaştıran Platform",
    namePlaceholder: "İsim",
    surnamePlaceholder: "Soyisim",
    emailPlaceholder: "Öğrenci E-posta Adresi",
    passwordPlaceholder: "Şifre",
    confirmPasswordPlaceholder: "Şifre Tekrarı",
    codeSentText: "Kod Gönderildi",
    sendCodeText: "Kod Gönder",
    verifyEmailMessage: "E-posta doğrulaması yapmalısınız",
    registerButtonText: "Kayıt Olun",
    alreadyHaveAccountText: "Bir hesabınız var mıydı?",
    loginLink: "Giriş Yapın",
  },
  en: {
    unmatchedPasswordsMessage: "Passwords don't match.",
    emailErrorMessage: `Only email addresses ending with “${ALLOWED_DOMAIN}” are allowed.`,
    passwordErrorMessage:
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",
    codeSentAlert: "A verification code has been sent to your email!",
    headerText: "The Platform That Makes Sharing Course Notes Easy",
    namePlaceholder: "Name",
    surnamePlaceholder: "Surname",
    emailPlaceholder: "Student Email Address",
    passwordPlaceholder: "Password",
    confirmPasswordPlaceholder: "Confirm Password",
    codeSentText: "Code Sent",
    sendCodeText: "Send Code",
    verifyEmailMessage: "You need to verify your email",
    registerButtonText: "Register",
    alreadyHaveAccountText: "Do you already have an account?",
    loginLink: "Login",
  },
};
