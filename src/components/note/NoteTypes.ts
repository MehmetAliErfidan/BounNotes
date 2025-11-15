export type Note = {
    title: string;
    course: string;
    teacher: string;
    username: string;
    date: string;
    description: string;
    price: number;
    rating: number;
}

export interface NoteCardProps {
  note: Note;
}