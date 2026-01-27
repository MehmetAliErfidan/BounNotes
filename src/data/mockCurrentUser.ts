import type { CurrentUser } from "../config/user.types";

export const mockCurrentUser: CurrentUser = {
  id: 1,
  email: "mehmet@example.com",
  username: "Mehmet",
  profile: {
    fullName: null,
    department: null,
    university: null,
    bio: null,
    avatarUrl: "",
  },
};
