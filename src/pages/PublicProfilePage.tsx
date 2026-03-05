import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/note/NoteCard";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import * as S from "../components/profile/!PublicProfile.styled";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import type { Note } from "../config/note.types";
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
  const { loadingText, profileLoadFailed, userNotFound, uploadedNotesTitle } =
    PUBLIC_PROFILE_TEXTS[lang];

  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadUserNotes = async () => {
      if (!username) {
        if (!isMounted) return;
        setUserNotes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(`${API_BASE_URL}/api/notes`, {
          headers: buildOptionalAuthHeaders(),
        });

        if (!res.ok) {
          if (isMounted) setHasError(true);
          return;
        }

        const notes = (await res.json()) as Note[];
        if (!isMounted) return;

        const filtered = notes.filter(
          (note) => note.owner.username === username,
        );
        setUserNotes(filtered);
      } catch {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUserNotes();

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

  if (!userNotes.length) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>{userNotFound}</S.EmptyState>
      </Main>
    );
  }

  const user = {
    id: userNotes[0].owner.id,
    username: userNotes[0].owner.username,
    email: "", // public profilde GÖSTERİLMEZ
    profile: {
      fullName: null,
      department: null,
      university: null,
      bio: null,
      avatarUrl: null,
    },
  };

  return (
    <>
      <Navbar />
      <Main>
        <ProfileHeader user={user} />

        <ProfileSummary profile={user.profile} onEdit={() => {}} />

        <S.SectionTitle>{uploadedNotesTitle}</S.SectionTitle>
        <S.Grid>
          {userNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => handleOpenNote(note.id)}
            />
          ))}
        </S.Grid>
      </Main>
    </>
  );
}
