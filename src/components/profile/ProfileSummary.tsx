import type { UserProfile } from "../../config/user.types";
import { UserPen } from "lucide-react";
import * as S from "./!ProfileSummary.styled";
import Tooltip from "../tooltip/Tooltip";
import { PROFILE_SUMMARY_TEXTS } from "../../i18n/translations/profile/user-profile/Profilesummary";
import { useLang } from "../../i18n";

type Props = {
  profile: UserProfile | null;
  onEdit: () => void;
};

export default function ProfileSummary({ profile, onEdit }: Props) {
  const { lang } = useLang();
  const { profileInformation, editProfile } = PROFILE_SUMMARY_TEXTS[lang];

  const isEmpty =
    !profile ||
    (!profile.fullName &&
      !profile.department &&
      !profile.grade &&
      !profile.favoriteClass &&
      !profile.favoriteTeacher &&
      !profile.favoriteHangoutPlace &&
      !profile.bio);

  return (
    <S.Wrapper>
      <S.Header>
        <S.TitleRow>
          <S.Title>{profileInformation}</S.Title>
          <Tooltip content={editProfile} delay={250}>
            <S.EditButton onClick={onEdit}>
              <UserPen />
            </S.EditButton>
          </Tooltip>
        </S.TitleRow>
      </S.Header>

      {isEmpty ? (
        <S.EmptyText>Henüz profil bilgisi eklenmedi.</S.EmptyText>
      ) : (
        <S.List>
          {profile?.fullName && <li>Ad Soyad: {profile.fullName}</li>}
          {profile?.department && <li>Bölüm: {profile.department}</li>}
          {profile?.grade && <li>Sınıf: {profile.grade}</li>}
          {profile?.favoriteClass && (
            <li>Favori Ders: {profile.favoriteClass}</li>
          )}
          {profile?.favoriteTeacher && (
            <li>Favori Hoca: {profile.favoriteTeacher}</li>
          )}
          {profile?.favoriteHangoutPlace && (
            <li>Kampüste Takılma Mekanı: {profile.favoriteHangoutPlace}</li>
          )}
          {profile?.bio && <li>Hakkımda: {profile.bio}</li>}
        </S.List>
      )}
    </S.Wrapper>
  );
}
