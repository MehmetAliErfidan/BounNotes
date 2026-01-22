import NoteForm from "../components/note/NoteForm.tsx";
import type { FormNote } from "../components/note/NoteTypes.ts";
import { useState } from "react";
import { useLang } from "../i18n/index.tsx";
import { CREATE_NOTE_TEXTS } from "../i18n/translations/notes/CreateNote.ts";

export default function NoteUpload() {
  const { lang } = useLang();
  const { uploadText } = CREATE_NOTE_TEXTS[lang];

  const [note, setNote] = useState<FormNote>({
    course: "",
    term: "",
    year: "",
    teacher: "",
    title: "",
    description: "",
    price: "",
  });

  return (
    <>
      <NoteForm note={note} setNote={setNote} />
      <button>{uploadText}</button>
    </>
  );
}
