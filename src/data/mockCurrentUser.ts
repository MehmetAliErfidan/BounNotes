import type { CurrentUser } from "../config/user.types";

export const mockCurrentUser: CurrentUser = {
  id: 1,
  email: "mehmet.erfidan@std.bogazici.edu.tr",
  username: "MehmetAli123",
  profile: {
    fullName: null,
    department: null,
    grade: null,
    favoriteClass: null,
    favoriteTeacher: null,
    favoriteHangoutPlace: null,
    bio: null,
    avatarUrl: "",
  },
};
