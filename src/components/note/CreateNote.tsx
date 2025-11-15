import NoteForm from "./NoteForm.tsx";
import type { Note } from "./NoteTypes.ts";
import { useState } from "react";

export default function UploadNote() {
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
      <button>Yükle</button>
    </>
  );
}
