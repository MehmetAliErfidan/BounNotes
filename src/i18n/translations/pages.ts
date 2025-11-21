export type LangObject = {
  tr: string;
  en: string;
};

/* LandingPage texts */
export function useLandingPageTexts(lang: "tr" | "en") {
  return {
    appDefinition:
      lang === "tr"
        ? "Boğaziçi öğrencileri için ders notu paylaşma uygulaması"
        : "A course note sharing platform for Boğaziçi University students",

    noHassleMessage:
      lang === "tr"
        ? "Ders notu aramak veya satmak için kendinizi yormayın."
        : "Finding or selling course notes shouldn’t be a hassle.",

    bounNotesDescription:
      lang === "tr"
        ? "BounNotes, Boğaziçi'ndeki çeşitli derslerin notlarını dijital ortamda satın alabileceğiniz ya da satabileceğiniz bir platformdur."
        : "BounNotes is a platform where you can digitally buy or sell course notes from a wide range of Boğaziçi University courses.",

    emailInfo:
      lang === "tr"
        ? "E-postası '@std.bogazici.edu.tr' ile biten herkes ekosistemimizden yararlanabilir."
        : "Anyone whose email ends with ‘@std.bogazici.edu.tr’ can benefit from our ecosystem.",

    buttonDirective:
      lang === "tr"
        ? "ders notları almak ya da satmak için:"
        : "To buy or sell course notes:",

    ifNoAccount:
      lang === "tr" ? "hesabınız yoksa:" : "if you don't have an account:",

    login: lang === "tr" ? "Giriş Yapın" : "Login",

    register: lang === "tr" ? "Kayıt Olun" : "Register",
  };
}

/* allowed domain, used in more than one function */
const allowedDomain = "@std.bogazici.edu.tr";

/* RegisterPage texts */
export function useRegisterPageTexts(lang: "tr" | "en") {
  return {
    unmatchedPasswordsMessage:
      lang === "tr" ? "Şifreler eşleşmiyor." : "Passwords don't match.",

    emailErrorMessage:
      lang === "tr"
        ? `Sadece "${allowedDomain}" uzantılı e-posta adreslerine izin verilir.`
        : `Only email addresses ending with “${allowedDomain}” are allowed.`,

    passwordErrorMessage:
      lang === "tr"
        ? "Şifre en az 8 karakter olmalı, büyük/küçük harf, rakam ve özel karakter içermeli."
        : "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",

    codeSentAlert:
      lang === "tr"
        ? "Doğrulama kodu e-postana gönderildi!"
        : "A verification code has been sent to your email!",

    headerText:
      lang === "tr"
        ? "Ders Notu Paylaşmayı Kolaylaştıran Platform"
        : "The Platform That Makes Sharing Course Notes Easy",

    namePlaceholder: lang === "tr" ? "İsim" : "Name",
    surnamePlaceholder: lang === "tr" ? "Soyisim" : "Surname",
    emailPlaceholder:
      lang === "tr" ? "Öğrenci E-posta Adresi" : "Student Email Address",
    passwordPlaceholder: lang === "tr" ? "Şifre" : "Password",
    confirmPasswordPlaceholder:
      lang === "tr" ? "Şifre Tekrarı" : "Confirm Password",

    codeSentText: lang === "tr" ? "Kod Gönderildi" : "Code Sent",
    sendCodeText: lang === "tr" ? "Kod Gönder" : "Send Code",

    verifyEmailMessage:
      lang === "tr"
        ? "E-posta doğrulaması yapmalısınız"
        : "You need to verify your email",

    registerButtonText: lang === "tr" ? "Kayıt Olun" : "Register",

    alreadyHaveAccountText:
      lang === "tr"
        ? "Bir hesabınız var mıydı?"
        : "Do you already have an account?",

    loginLink: lang === "tr" ? "Giriş Yapın" : "Login",
  };
}

/* LoginPage texts */
export function useLoginPageTexts(lang: "tr" | "en") {
  return {
    errorMessage:
      lang === "tr"
        ? `Sadece "${allowedDomain}" uzantılı e-posta adreslerine izin verilir.`
        : `Only email addresses ending with “${allowedDomain}” are allowed.`,

    headerText:
      lang === "tr"
        ? "Ders Notu Paylaşmayı Kolaylaştıran Platform"
        : "The Platform That Makes Sharing Course Notes Easy",

    emailPlaceholder:
      lang === "tr" ? "Öğrenci E-posta Adresi" : "Student Email Address",

    passwordPlaceholder: lang === "tr" ? "Şifre" : "Password",

    login: lang === "tr" ? "Giriş Yapın" : "Login",

    dontHaveAccountText:
      lang === "tr" ? "Hesabınız yok mu?" : "Don't have an account?",

    registerLink: lang === "tr" ? "Kayıt Olun" : "Register",
  };
}
