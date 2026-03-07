import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteCard from "../components/note/NoteCard";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import * as S from "../components/profile/!PublicProfile.styled";
import { API_BASE_URL } from "../config/api";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import type { Note } from "../config/note.types";
import type { CurrentUser } from "../config/user.types";
import { useLang } from "../i18n";
import { PUBLIC_PROFILE_TEXTS } from "../i18n/translations/pages/PublicProfile";
/**
 * Route:
 * /users/:username
 */
export default function PublicProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { lang } = useLang();
  const {
    loadingText,
    profileLoadFailed,
    userNotFound,
    uploadedNotesTitle,
    noUploadedNotes,
  } = PUBLIC_PROFILE_TEXTS[lang];

  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [publicUser, setPublicUser] = useState<CurrentUser | null>(null);
  const [isUserMissing, setIsUserMissing] = useState(false);
  const [hasNoUploadedNotes, setHasNoUploadedNotes] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPublicProfile = async () => {
      if (!username) {
        if (!isMounted) return;
        setPublicUser(null);
        setUserNotes([]);
        setHasError(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setHasError(false);
        setIsUserMissing(false);
        setHasNoUploadedNotes(false);

        const [profileRes, notesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users/${username}/public-profile`, {
            headers: buildOptionalAuthHeaders(),
          }),
          fetch(`${API_BASE_URL}/api/users/${username}/notes`, {
            headers: buildOptionalAuthHeaders(),
          }),
        ]);

        if (profileRes.status === 404) {
          if (!isMounted) return;
          setIsUserMissing(true);
          setPublicUser(null);
          setUserNotes([]);
          return;
        }

        if (!profileRes.ok) {
          if (!isMounted) return;
          setHasError(true);
          return;
        }

        if (!notesRes.ok) {
          if (!isMounted) return;
          setHasError(true);
          return;
        }

        const publicUserData = (await profileRes.json()) as CurrentUser;
        const notesData = (await notesRes.json()) as Note[];
        if (!isMounted) return;

        setPublicUser(publicUserData);
        setUserNotes(notesData);
        setHasNoUploadedNotes(notesData.length === 0);
      } catch {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPublicProfile();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleOpenNote = (noteId: number) => {
    navigate(`/note/${noteId}`);
  };

  if (loading) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>{loadingText}</S.EmptyState>
      </Main>
    );
  }

  if (hasError) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>{profileLoadFailed}</S.EmptyState>
      </Main>
    );
  }

  if (isUserMissing) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>{userNotFound}</S.EmptyState>
      </Main>
    );
  }

  if (!publicUser) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>{userNotFound}</S.EmptyState>
      </Main>
    );
  }

  return (
    <>
      <Navbar />
      <Main>
        <ProfileHeader user={publicUser} />

        <ProfileSummary
          profile={publicUser.profile}
          readOnly
          onEdit={() => {}}
        />

        <S.SectionTitle>{uploadedNotesTitle}</S.SectionTitle>
        {hasNoUploadedNotes ? (
          <S.EmptyState>{noUploadedNotes}</S.EmptyState>
        ) : (
          <S.Grid>
            {userNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onOpen={() => handleOpenNote(note.id)}
              />
            ))}
          </S.Grid>
        )}
      </Main>
    </>
  );
}
