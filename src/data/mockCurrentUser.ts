import type { CurrentUser } from "../config/user.types";

export const mockCurrentUser: CurrentUser = {
  id: 1,
  email: "mehmet.erfidan@std.bogazici.edu.tr",
  username: "MehmetAli123",
  profile: {
    fullName: null,
    department: null,
    grade: null,
    favoriteCourse: null,
    favoriteProfessor: null,
    favoritePlace: null,
    about: null,
    avatarUrl: "",
  },
};
