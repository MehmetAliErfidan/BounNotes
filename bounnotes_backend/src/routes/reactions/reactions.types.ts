export type ReactionType = "like" | "dislike";

export type NoteReactionRow = {
  id: number;
  note_id: number;
  user_id: number;
  reaction: ReactionType;
  created_at: Date | string;
};

export type NoteReactionItem = {
  id: number;
  noteId: number;
  userId: number;
  reaction: ReactionType;
  createdAt: string;
};

export type SetReactionInput = {
  noteId: number;
  userId: number;
  reaction: ReactionType;
};
