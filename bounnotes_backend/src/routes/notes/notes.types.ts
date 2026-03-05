export type NoteListItem = {
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

export type NoteListRow = {
  id: number;
  title: string;
  course: string;
  term: "spring" | "summer" | "fall";
  year: number;
  teacher: string;
  description: string;
  price: string;
  is_listed: boolean;
  created_at: Date | string;
  owner_id: number;
  owner_username: string;
  like_count: number;
  dislike_count: number;
};

export type CreateNoteInput = {
  title: string;
  course: string;
  term: "spring" | "summer" | "fall";
  year: number;
  teacher: string;
  description: string;
  price: number;
  ownerId: number;
};

export type UpdateNoteInput = {
  title: string;
  course: string;
  term: "spring" | "summer" | "fall";
  year: number;
  teacher: string;
  description: string;
  price: number;
};
