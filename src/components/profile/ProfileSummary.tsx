import type { UserProfile } from "../../config/user.types";
import * as S from "./!ProfileSummary.styled";

type Props = {
  profile: UserProfile | null;
  onEdit: () => void;
};

export default function ProfileSummary({ profile, onEdit }: Props) {
  const isEmpty =
    !profile ||
    (!profile.fullName &&
      !profile.department &&
      !profile.university &&
      !profile.bio);

  return (
    <S.Wrapper>
      <S.Header>
        <h2>Profil Bilgileri</h2>
        <S.EditButton onClick={onEdit}>Düzenle</S.EditButton>
      </S.Header>

      {isEmpty ? (
        <S.EmptyText>Henüz profil bilgisi eklenmedi.</S.EmptyText>
      ) : (
        <S.List>
          {profile.fullName && <li>Ad Soyad: {profile.fullName}</li>}
          {profile.department && <li>Bölüm: {profile.department}</li>}
          {profile.university && <li>Üniversite: {profile.university}</li>}
          {profile.bio && <li>Hakkımda: {profile.bio}</li>}
        </S.List>
      )}
    </S.Wrapper>
  );
}
