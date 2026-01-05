import { useLang } from "../../../i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      className="
        flex items-center justify-center

        rounded-full
        border border-gray-300
        bg-gray-100

        text-gray-700 font-medium

        transition-all duration-200
        hover:bg-gray-200
        cursor-pointer
        px-3 py-1.5 text-xs
        sm:px-3 sm:py-1.5 sm:text-xs
        md:px-3.5 md:py-2 md:text-sm
        lg:px-4 lg:py-2 lg:text-sm
      "
    >
      {lang === "tr" ? "EN" : "TR"}
    </button>
  );
}
