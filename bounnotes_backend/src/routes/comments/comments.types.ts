export type NoteCommentRow = {
  id: number;
  note_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
};

export type NoteCommentItem = {
  id: number;
  noteId: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentInput = {
  noteId: number;
  userId: number;
  content: string;
};
