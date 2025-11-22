import NoteForm from "./NoteForm.tsx";
import type { FormNote } from "./NoteTypes";
import { useState } from "react";
import { useCreateNoteTexts } from "../../i18n/translations/note";
import { useLang } from "../../i18n";

export default function CreateNote() {
  const { lang } = useLang();
  const { uploadText } = useCreateNoteTexts(lang);

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
