export type UserProfileRow = {
  id: number;
  username: string;
  full_name: string | null;
  department: string | null;
  grade: string | null;
  favorite_course: string | null;
  favorite_professor: string | null;
  favorite_place: string | null;
  about: string | null;
  avatar_url: string | null;
};

export type UserProfileItem = {
  id: number;
  username: string;
  profile: {
    fullName: string | null;
    department: string | null;
    grade: string | null;
    favoriteCourse: string | null;
    favoriteProfessor: string | null;
    favoritePlace: string | null;
    about: string | null;
    avatarUrl: string | null;
  };
};

export type UpdateUserProfileInput = {
  fullName?: string | null;
  department?: string | null;
  grade?: string | null;
  favoriteCourse?: string | null;
  favoriteProfessor?: string | null;
  favoritePlace?: string | null;
  about?: string | null;
  avatarUrl?: string | null;
};
