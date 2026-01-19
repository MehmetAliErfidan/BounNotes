export type Note = {
  id: number;
  title: string;
  course: string;
  teacher: string;
  username: string;
  rating: number;
  price: string;
  date: string;
  description: string;
  isPurchased: boolean; // After backend, this will be removed
  isUploaded: boolean; // After backend, this will be removed
};

export type FormNote = {
  title: string;
  course: string;
  teacher: string;
  date: string;
  description: string;
  price: string;
  rating: number;
};

export interface NoteCardProps {
  note: Note;
  onOpen?: () => void;
}
