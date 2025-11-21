import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "tr" | "en";

interface I18nContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextProps | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "tr"
  );

  const handleSetLang = (val: Lang) => {
    localStorage.setItem("lang", val);
    setLang(val);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLang must be used within I18nProvider");
  return ctx;
}
