export type Note = {
  id: number;
  title: string;
  course: string;
  term: string;
  year: number;
  teacher: string;
  username: string;
  rating: number;
  price: string;
  date: string;
  description: string;
  isPurchased: boolean; // After backend, this will be removed
  isUploaded: boolean; // After backend, this will be removed
  isLiked: boolean;
  likeCount: number;
  dislikeCount: number;
  isDisliked: boolean;
};

export type FormNote = {
  title: string;
  course: string;
  term: "" | "spring" | "summer" | "fall";
  year: number | "";
  teacher: string;
  description: string;
  price: number | "";
};

export type NoteMode = "market" | "purchased" | "uploaded" | "checkout";

export interface NoteCardProps {
  note: Note;
  onOpen?: () => void;
}
