import UserAvatar from "./UserAvatar";
import LanguageSwitcher from "./LanguageSwitcher";

export default function UserActions() {
  //Mock user data until backend
  const mockUser = {
    username: "Mehmet",
    avatarUrl: "",
  };

  return (
    <>
      <UserAvatar username={mockUser.username} avatarUrl={mockUser.avatarUrl} />
      <LanguageSwitcher />
    </>
  );
}
