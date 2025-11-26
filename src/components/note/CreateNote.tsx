import NoteForm from "./NoteForm.tsx";
import type { FormNote } from "./NoteTypes";
import { useState } from "react";
import { useLang } from "../../i18n";
import { CREATE_NOTE_TEXTS } from "../../i18n/translations/notes/CreateNote.ts";

export default function CreateNote() {
  const { lang } = useLang();
  const { uploadText } = CREATE_NOTE_TEXTS[lang];

  const [note, setNote] = useState<FormNote>({
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
