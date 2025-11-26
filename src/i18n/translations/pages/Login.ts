import { ALLOWED_DOMAIN } from "../../../pages/constants";

export const LOGIN_PAGE = {
  tr: {
    errorMessage: `Sadece "${ALLOWED_DOMAIN}" uzantılı e-posta adreslerine izin verilir.`,
    headerText: "Ders Notu Paylaşmayı Kolaylaştıran Platform",
    emailPlaceholder: "Öğrenci E-posta Adresi",
    passwordPlaceholder: "Şifre",
    login: "Giriş Yapın",
    dontHaveAccountText: "Hesabınız yok mu?",
    registerLink: "Kayıt Olun",
  },
  en: {
    errorMessage: `Only email addresses ending with “${ALLOWED_DOMAIN}” are allowed.`,
    headerText: "The Platform That Makes Sharing Course Notes Easy",
    emailPlaceholder: "Student Email Address",
    passwordPlaceholder: "Password",
    login: "Login",
    dontHaveAccountText: "Don't have an account?",
    registerLink: "Register",
  },
};
