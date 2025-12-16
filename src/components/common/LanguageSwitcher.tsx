import { useLang } from "../../i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      className="rounded-l border "
    >
      {lang === "tr" ? "English" : "Türkçe"}
    </button>
  );
}
