export type UserProfile = {
  fullName?: string | null;
  department?: string | null;
  grade?: string | null;
  favoriteCourse?: string | null;
  favoriteProfessor?: string | null;
  favoritePlace?: string | null;
  about?: string | null;
  avatarUrl?: string | null;
};

export type CurrentUser = {
  id: number;
  email?: string;
  username: string;
  profile: UserProfile | null;
};
