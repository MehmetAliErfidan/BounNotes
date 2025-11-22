export type Note = {
  title: string;
  course: string;
  teacher: string;
  username: string;
  date: string;
  description: string;
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
};

export interface NoteCardProps {
  note: Partial<Note>;
  setNote: React.Dispatch<React.SetStateAction<Partial<Note>>>;
}
