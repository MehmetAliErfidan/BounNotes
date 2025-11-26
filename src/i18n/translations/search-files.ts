import { useText } from "../useText";

export type LangObject = {
  tr: string;
  en: string;
};

/* SearchBar texts */
export function useSearchBarTexts() {
  return {
    searchPlaceholder: useText({ tr: "Ara", en: "Search" }),
  };
}

export function useSearchResults() {
  return {
    noResult: useText({ tr: "Sonuç bulunamadı.", en: "No results found." }),
  };
}
