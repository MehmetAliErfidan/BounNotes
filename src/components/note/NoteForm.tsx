import type { Note } from "./NoteTypes";
import type { FormNote } from "./NoteTypes";
import { useNoteFormTexts } from "../../i18n/translations/note";
import { useLang } from "../../i18n";

interface NoteFormProps {
  note: Partial<Note>;
  setNote: React.Dispatch<React.SetStateAction<FormNote>>;
}

export default function NoteForm({ note, setNote }: NoteFormProps) {
  const { lang } = useLang();
  const {
    coursePlaceholder,
    instructorPlaceholder,
    titlePlaceholder,
    descriptionPlaceholder,
    pricePlaceholder,
  } = useNoteFormTexts(lang);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  return (
    <>
      <form>
        <input
          onChange={handleChange}
          value={note.course}
          required
          type="text"
          name="course"
          placeholder={coursePlaceholder}
        />
        <input
          onChange={handleChange}
          value={note.teacher}
          required
          type="text"
          name="teacher"
          placeholder={instructorPlaceholder}
        />
        <input
          onChange={handleChange}
          value={note.date}
          required
          type="date"
          name="date"
        />
        <input
          onChange={handleChange}
          value={note.title}
          required
          type="text"
          name="title"
          placeholder={titlePlaceholder}
        />
        <textarea
          onChange={handleChange}
          value={note.description}
          required
          name="description"
          placeholder={descriptionPlaceholder}
        />
        <input
          onChange={handleChange}
          value={note.price}
          required
          type="number"
          name="price"
          placeholder={pricePlaceholder}
          min="20"
        />
      </form>
    </>
  );
}
