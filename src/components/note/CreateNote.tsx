import NoteForm from "./NoteForm.tsx";
import type { Note } from "./NoteTypes.ts";
import { useState } from "react";
import { useCreateNoteTexts } from "../../i18n/translations/note";
import { useLang } from "../../i18n";

export default function UploadNote() {
  const { lang } = useLang();
  const { uploadText } = useCreateNoteTexts(lang);

  const [note, setNote] = useState<Partial<Note>>({
    course: "",
    teacher: "",
    date: "",
    title: "",
    description: "",
    price: 0,
  });

  return (
    <>
      <NoteForm note={note} setNote={setNote} />
      <button>{uploadText}</button>
    </>
  );
}
