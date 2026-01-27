export type UserProfile = {
  fullName?: string | null;
  department?: string | null;
  university?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type CurrentUser = {
  id: number;
  email: string;
  username: string;
  profile: UserProfile | null;
};
