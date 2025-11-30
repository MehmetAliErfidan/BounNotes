export type Note = {
  id: number;
  title: string;
  course: string;
  teacher: string;
  username: string;
  price: number;
  rating: number;
};

export type FormNote = {
  title: string;
  course: string;
  teacher: string;
  date: string;
  description: string;
  price: number;
  rating: number;
};

export interface NoteCardProps {
  note: Note;
  setNote?: React.Dispatch<React.SetStateAction<Partial<Note>>>;
}
