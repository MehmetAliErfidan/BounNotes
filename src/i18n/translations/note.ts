export type LangObject = {
  tr: string;
  en: string;
};

/* CreateNote texts */
export function useCreateNoteTexts(lang: "tr" | "en") {
  return {
    uploadText: lang === "tr" ? "Yükle" : "Upload",
  };
}

/* NoteCard texts */
export function useNoteCardTexts(lang: "tr" | "en") {
  return {
    seeDetailText: lang === "tr" ? "Detay Gör" : "See in Detail",
  };
}

/* NoteDetailPage texts */
export function useNoteDetailPageTexts(lang: "tr" | "en") {
  return {
    buyText: lang === "tr" ? "Satın Al" : "Buy",
  };
}

/* NoteForm texts */
export function useNoteFormTexts(lang: "tr" | "en") {
  return {
    coursePlaceholder: lang === "tr" ? "Ders Adı" : "Course Name",

    instructorPlaceholder: lang === "tr" ? "Dersin Hocası" : "Instructor",

    titlePlaceholder: lang === "tr" ? "Notunuzun Başlığı" : "Note Title",

    descriptionPlaceholder:
      lang === "tr" ? "Notunuzun Açıklaması" : "Note Description",

    pricePlaceholder: lang === "tr" ? "Fiyat (TL)" : "Price (Turkish Lira)",
  };
}
