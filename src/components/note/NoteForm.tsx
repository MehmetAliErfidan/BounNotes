import type { Note } from "./NoteTypes";

interface NoteFormProps {
  note: Partial<Note>;
  setNote: React.Dispatch<React.SetStateAction<any>>;
}

export default function NoteForm({ note, setNote }: NoteFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
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
          placeholder="Ders Adı"
        />
        <input
          onChange={handleChange}
          value={note.teacher}
          required
          type="text"
          name="teacher"
          placeholder="Dersin Hocası"
        />
        <input
          onChange={handleChange}
          value={note.date}
          required
          type="date"
          name="date"
          placeholder="Dersin Tarihi"
        />
        <input
          onChange={handleChange}
          value={note.title}
          required
          type="text"
          name="title"
          placeholder="Notunuzun Başlığı"
        />
        <textarea
          onChange={handleChange}
          value={note.description}
          required
          name="description"
          placeholder="Notunuzun Açıklaması"
        />
        <input
          onChange={handleChange}
          value={note.price}
          required
          type="number"
          name="price"
          placeholder="Fiyat (TL)"
          min="20"
        />
      </form>
    </>
  );
}
