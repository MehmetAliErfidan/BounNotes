import type { UserProfile } from "../../config/user.types";
import { UserPen } from "lucide-react";
import * as S from "./!ProfileSummary.styled";
import Tooltip from "../tooltip/Tooltip";
import { PROFILE_SUMMARY_TEXTS } from "../../i18n/translations/profile/user-profile/ProfileSummary";
import { useLang } from "../../i18n";

type Props = {
  profile: UserProfile | null;
  onEdit: () => void;
};

export default function ProfileSummary({ profile, onEdit }: Props) {
  const { lang } = useLang();
  const {
    profileInformation,
    editProfile,
    noInfoYet,
    fullName,
    department,
    grade,
    favoriteCourse,
    favoriteProfessor,
    favoritePlace,
    aboutMe,
  } = PROFILE_SUMMARY_TEXTS[lang];

  const isEmpty =
    !profile ||
    (!profile.fullName &&
      !profile.department &&
      !profile.grade &&
      !profile.favoriteCourse &&
      !profile.favoriteProfessor &&
      !profile.favoritePlace &&
      !profile.about);

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
        <S.EmptyText>{noInfoYet}</S.EmptyText>
      ) : (
        <S.List>
          {profile?.fullName && (
            <li>
              <span className="label">{fullName}</span>
              <span className="value">{profile.fullName}</span>
            </li>
          )}
          {profile?.department && (
            <li>
              <span className="label">{department}</span>
              <span className="value">{profile.department}</span>
            </li>
          )}
          {profile?.grade && (
            <li>
              <span className="label">{grade}</span>
              <span className="value">{profile.grade}</span>
            </li>
          )}
          {profile?.favoriteCourse && (
            <li>
              <span className="label">{favoriteCourse}</span>
              <span className="value">{profile.favoriteCourse}</span>
            </li>
          )}
          {profile?.favoriteProfessor && (
            <li>
              <span className="label">{favoriteProfessor}</span>
              <span className="value">{profile.favoriteProfessor}</span>
            </li>
          )}
          {profile?.favoritePlace && (
            <li>
              <span className="label">{favoritePlace}</span>
              <span className="value">{profile.favoritePlace}</span>
            </li>
          )}
          {profile?.about && (
            <li>
              <span className="label">{aboutMe}:</span>
              <span className="value">{profile.about}</span>
            </li>
          )}
        </S.List>
      )}
    </S.Wrapper>
  );
}
