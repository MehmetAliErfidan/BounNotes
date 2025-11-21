import { useText } from "../useText";

export type LangObject = {
  tr: string;
  en: string;
};

/* LandingPage texts*/
export function useLandingPageTexts() {
  return {
    appDefinition: useText({
      tr: "Boğaziçi öğrencileri için ders notu paylaşma uygulaması",
      en: "A course note sharing platform for Boğaziçi University students",
    }),

    noHassleMessage: useText({
      tr: "Ders notu aramak veya satmak için kendinizi yormayın.",
      en: "Finding or selling course notes shouldn’t be a hassle.",
    }),

    bounNotesDescription: useText({
      tr: "BounNotes, Boğaziçi'ndeki çeşitli derslerin notlarını dijital ortamda satın alabileceğiniz ya da satabileceğiniz bir platformdur.",
      en: "BounNotes is a platform where you can digitally buy or sell course notes from a wide range of Boğaziçi University courses.",
    }),

    emailInfo: useText({
      tr: "E-postası '@std.bogazici.edu.tr' ile biten herkes ekosistemimizden yararlanabilir.",
      en: "Anyone whose email ends with ‘@std.bogazici.edu.tr’ can benefit from our ecosystem.",
    }),

    buttonDirective: useText({
      tr: "ders notları almak ya da satmak için:",
      en: "To buy or sell course notes:",
    }),

    ifNoAccount: useText({
      tr: "hesabınız yoksa:",
      en: "if you don't have an account:",
    }),

    login: useText({ tr: "Giriş Yapın", en: "Login" }),

    register: useText({ tr: "Kayıt Olun", en: "Register" }),
  };
}

/* RegisterPage texts */
export function useRegisterPageTexts() {
  const allowedDomain = "std.bogazici.edu.tr";

  return {
    unmatchedPasswordsMessage: useText({
      tr: "Şifreler eşleşmiyor.",
      en: "Passwords don't match.",
    }),
    emailErrorMessage: useText({
      tr: `Sadece "${allowedDomain}" uzantılı e-posta adreslerine izin verilir.`,
      en: `Only email addresses ending with “${allowedDomain}” are allowed.`,
    }),
    passwordErrorMessage: useText({
      tr: "Şifre en az 8 karakter olmalı, büyük/küçük harf, rakam ve özel karakter içermeli.",
      en: "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",
    }),
  };
}
