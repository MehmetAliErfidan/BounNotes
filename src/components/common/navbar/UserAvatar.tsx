import { Avatar, AvatarImg } from "./!UserAvatar.styled";

type UserAvatarProps = {
  username: string;
  avatarUrl?: string;
};

export default function UserAvatar({ username, avatarUrl }: UserAvatarProps) {
  return (
    <Avatar>
      {avatarUrl ? (
        <AvatarImg src={avatarUrl} alt="Profile Photo" />
      ) : (
        <span>{username[0].toUpperCase()}</span>
      )}
    </Avatar>
  );
}
