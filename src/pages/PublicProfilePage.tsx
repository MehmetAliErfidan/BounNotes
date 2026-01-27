import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/note/NoteCard";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import * as S from "../components/profile/!PublicProfile.styled";
import { dummyData } from "../data/dummyData";

/**
 * Route:
 * /users/:username
 */
export default function PublicProfilePage() {
  const navigate = useNavigate();

  const handleOpenNote = (noteId: number) => {
    navigate(`/note/${noteId}`);
  };

  const { username } = useParams<{ username: string }>();

  // ---- MOCK BACKEND LOGIC ----
  // backend gelince:
  // GET /users/:username
  const userNotes = dummyData.filter(
    (item) => item.note.owner.username === username,
  );

  if (!userNotes.length) {
    return (
      <Main>
        <Navbar />
        <S.EmptyState>Kullanıcı bulunamadı.</S.EmptyState>
      </Main>
    );
  }

  const user = {
    id: userNotes[0].note.owner.id,
    username: userNotes[0].note.owner.username,
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
        {/* Kullanıcı vitrini */}
        <ProfileHeader user={user} />

        {/* Profil bilgileri (sadece okuma) */}
        <ProfileSummary profile={user.profile} onEdit={() => {}} />

        {/* Kullanıcının YÜKLEDİĞİ notlar */}
        <S.SectionTitle>Yüklenen Notlar</S.SectionTitle>
        <S.Grid>
          {userNotes.map((item) => (
            <NoteCard
              key={item.note.id}
              note={item.note}
              onOpen={() => handleOpenNote(item.note.id)}
            />
          ))}
        </S.Grid>
      </Main>
    </>
  );
}
