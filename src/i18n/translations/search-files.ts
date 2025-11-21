import { useText } from "../useText";

export type LangObject = {
  tr: string;
  en: string;
};

/* CategoryFilter texts */
export function useCategoryFilterTexts() {
  return {
    customize: useText({
      tr: "Aramanızı Özelleştirin:",
      en: "Customize your search:",
    }),

    noteOwner: useText({
      tr: "Kullanıcı (Not Sahibi)",
      en: "User (Note Owner)",
    }),

    instructor: useText({ tr: "Hoca", en: "Instructor" }),
    course: useText({ tr: "Ders", en: "Course" }),
  };
}

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
