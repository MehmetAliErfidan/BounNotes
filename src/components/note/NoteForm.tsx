import type { FormNote } from "./NoteTypes";
import { Container, HeaderText } from "./!NoteForm.styled";
import { Form, Input, Header, Textarea } from "../../styles/GlobalStyles";
import { Select } from "../ui/select";
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
    instructorPlaceholder,
    titlePlaceholder,
    descriptionPlaceholder,
    pricePlaceholder,
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

  return (
    <Container>
      <Form variant="plain" size="wide">
        <Header>
          <HeaderText>{headerText}</HeaderText>
        </Header>

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
          min={2020}
          max={currentYear + 1}
          placeholder={yearPlaceholder}
        />

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
        <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>
          {note.description.length}/500
        </p>

        <Input
          onChange={handleChange}
          value={note.price ?? ""}
          required
          type="number"
          name="price"
          min={20}
          placeholder={pricePlaceholder}
        />
      </Form>
    </Container>
  );
}
