import { useState } from "react";
import NoteForm from "../components/note/NoteForm.tsx";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import type { FormNote } from "../components/note/NoteTypes.ts";
import ImageUpload from "../components/pdf/ImageUpload.tsx";
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

  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.term) {
      console.log("Term is required");
      return;
    }

    console.log("Note to be uploaded:", note);
    // Here you would typically send the note data to your backend server
  };

  return (
    <Main>
      <Navbar />
      <NoteForm note={note} setNote={setNote} />
      <ImageUpload images={images} onChange={setImages} min={1} max={3} />
      <button onClick={handleSubmit}>{uploadText}</button>
    </Main>
  );
}
