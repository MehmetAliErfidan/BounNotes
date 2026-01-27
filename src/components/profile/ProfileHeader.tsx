import UserAvatar from "../common/navbar/UserAvatar";
import type { CurrentUser } from "../../config/user.types";
import * as S from "./!ProfileHeader.styled";

type Props = {
  user: CurrentUser;
};

export default function ProfileHeader({ user }: Props) {
  return (
    <S.Wrapper>
      <UserAvatar
        username={user.username}
        avatarUrl={user.profile?.avatarUrl ?? ""}
      />
      <S.TextBlock>
        <S.Username>{user.username}</S.Username>
        <S.Email>{user.email}</S.Email>
      </S.TextBlock>
    </S.Wrapper>
  );
}
