import type { FormNote } from "../../config/note.types";
import { NOTE_RULES } from "../../config/note.rules";
import { FileText } from "lucide-react";
import { CharCount, SectionHeader } from "./!NoteForm.styled";
import { FormSection, Input, Textarea } from "../../styles/GlobalStyles";
import { Select } from "../ui/select";
import { validateNote } from "../../config/note.validation";
import { NOTE_FORM_TEXTS } from "../../i18n/translations/notes/NoteForm";
import { useLang } from "../../i18n";

interface NoteFormProps {
  note: FormNote;
  setNote: React.Dispatch<React.SetStateAction<FormNote>>;
}

type Term = FormNote["term"];

export default function NoteForm({ note, setNote }: NoteFormProps) {
  const { lang } = useLang();
  const {
    headerText,
    coursePlaceholder,
    selectTerm,
    fallTerm,
    springTerm,
    summerTerm,
    yearPlaceholder,
    yearWarning,
    instructorPlaceholder,
    titlePlaceholder,
    descriptionPlaceholder,
    pricePlaceholder,
    priceWarning,
  } = NOTE_FORM_TEXTS[lang];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNote((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "year"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const currentYear = new Date().getFullYear();
  const { year, price } = validateNote(note);

  return (
    <FormSection $variant="plain" $size="wide">
      <SectionHeader>
        <FileText /> {headerText}
      </SectionHeader>

      <Input
        onChange={handleChange}
        value={note.course}
        required
        name="course"
        placeholder={coursePlaceholder}
      />

      <Select<Term>
        value={note.term}
        onChange={(value) => setNote((p) => ({ ...p, term: value }))}
        placeholder={selectTerm}
        options={[
          { value: "spring", label: springTerm },
          { value: "summer", label: summerTerm },
          { value: "fall", label: fallTerm },
        ]}
      />

      <Input
        onChange={handleChange}
        value={note.year}
        required
        type="number"
        name="year"
        min={NOTE_RULES.MIN_YEAR}
        max={currentYear + NOTE_RULES.MAX_YEAR_OFFSET}
        placeholder={yearPlaceholder}
      />
      {year.isInvalid && (
        <p style={{ fontSize: "0.75rem", color: "#dc2626" }}>
          {yearWarning} {NOTE_RULES.MIN_YEAR}
          {" - "}
          {currentYear + NOTE_RULES.MAX_YEAR_OFFSET}
        </p>
      )}

      <Input
        onChange={handleChange}
        value={note.teacher}
        required
        name="teacher"
        placeholder={instructorPlaceholder}
      />

      <Input
        onChange={handleChange}
        value={note.title}
        required
        name="title"
        placeholder={titlePlaceholder}
      />

      <Textarea
        onChange={handleChange}
        value={note.description}
        required
        name="description"
        placeholder={descriptionPlaceholder}
        maxLength={500}
      />
      <CharCount>{note.description.length}/500</CharCount>

      <Input
        onChange={handleChange}
        value={note.price ?? ""}
        required
        type="number"
        name="price"
        min={NOTE_RULES.MIN_PRICE}
        placeholder={pricePlaceholder}
      />
      {price.isInvalid && (
        <p style={{ fontSize: "0.75rem", color: "#dc2626" }}>
          {priceWarning} ₺{NOTE_RULES.MIN_PRICE}
        </p>
      )}
    </FormSection>
  );
}
