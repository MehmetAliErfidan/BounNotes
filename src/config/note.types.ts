export type Note = {
  id: number;
  title: string;
  course: string;
  term: "spring" | "summer" | "fall";
  year: number;
  teacher: string;
  description: string;
  price: number;
  isListed: boolean;
  createdAt: string;

  owner: {
    id: number;
    username: string;
  };

  stats: {
    likeCount: number;
    dislikeCount: number;
  };
};

export type NoteWithContext = {
  note: Note;
  context: {
    isOwner: boolean;
    isPurchased: boolean;
    isLiked: boolean;
  };
};

export type NoteAsset = {
  id: number;
  noteId: number;
  assetType: "pdf" | "image";
  fileUrl: string;
  sortOrder: number;
  createdAt: string;
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

export interface NoteCardProps {
  note: Note;
  onOpen?: () => void;
}
