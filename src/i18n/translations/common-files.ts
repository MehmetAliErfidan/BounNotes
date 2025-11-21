import { useText } from "../useText";

export type LangObject = {
  tr: string;
  en: string;
};

/* Navbar texts */
export function useNavbarTexts() {
  return {
    login: useText({ tr: "Giriş Yapın", en: "Login" }),
    register: useText({ tr: "Kayıt Olun", en: "Register" }),
  };
}

/* Footer texts */
export function useFooterTexts() {
  return {
    appDefinition: useText({
      tr: "Boğaziçi Öğrencileri İçin Ders Notu Paylaşımını Kolaylaştıran Platform",
      en: "A Platform That Makes Sharing Class Notes Easier for Boğaziçi Students",
    }),

    contactInfo: useText({ tr: "İletişim:", en: "Contact:" }),
    email: useText({ tr: "E-posta Adresi: ", en: "E-mail Address: " }),
    about: useText({ tr: "Hakkında", en: "About" }),
    FAQ: useText({ tr: "SSS", en: "FAQ" }),
    copyrightMessage: useText({
      tr: "© 2025 Tüm hakları saklıdır.",
      en: "© 2025 All rights reserved.",
    }),
  };
}
