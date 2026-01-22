import type { FormNote } from "./NoteTypes";
import { NOTE_FORM_TEXTS } from "../../i18n/translations/notes/NoteForm";
import { useLang } from "../../i18n";

interface NoteFormProps {
  note: FormNote;
  setNote: React.Dispatch<React.SetStateAction<FormNote>>;
}

export default function NoteForm({ note, setNote }: NoteFormProps) {
  const { lang } = useLang();
  const {
    coursePlaceholder,
    selectTerm,
    fallTerm,
    springTerm,
    summerTerm,
    yearPlaceholder,
    instructorPlaceholder,
    titlePlaceholder,
    descriptionPlaceholder,
    pricePlaceholder,
  } = NOTE_FORM_TEXTS[lang];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: ["price", "year"].includes(name) ? Number(value) : value,
    }));
  };

  const currentYear = new Date().getFullYear();

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
        <select name="term" onChange={handleChange} value={note.term} required>
          <option value="" disabled>
            {selectTerm}
          </option>
          <option value="spring">{springTerm}</option>
          <option value="summer">{summerTerm}</option>
          <option value="fall">{fallTerm}</option>
        </select>
        <input
          onChange={handleChange}
          value={note.year}
          required
          min={2020}
          max={currentYear + 1}
          step={1}
          type="number"
          inputMode="numeric"
          name="year"
          placeholder={yearPlaceholder}
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
          value={note.price ?? ""}
          required
          type="number"
          inputMode="numeric"
          name="price"
          placeholder={pricePlaceholder}
          min={20}
          step={1}
        />
      </form>
    </>
  );
}
