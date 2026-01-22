import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { MY_NOTE_PAGE_TEXTS } from "../i18n/translations/pages/MyNotes";
import { useLang } from "../i18n";
import Navbar from "../components/common/navbar/Navbar";
import NotesTabBar from "../components/note/my-notes/NotesTabBar";
import {
  NotesTabBarContainer,
  Grid,
  NoNotesText,
  NoNotesWrapper,
  EmptyIllustration,
  UploadNoteCTAButton,
} from "./!MyNotesPage.styled";
import OxNoUpload from "../assets/illustrations/no-uploads-yet/OxNoUpload.jpg";
import { Main } from "../styles/GlobalStyles";
import type { NotesTab } from "../components/note/my-notes/NotesTabBar.types";
import { dummyData } from "../data/dummyData";
import NoteCard from "../components/note/NoteCard";

export default function MyNotesPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { noPurchaseYet, noUploadsYet, uploadFirstNote } =
    MY_NOTE_PAGE_TEXTS[lang];

  const [activeTab, setActiveTab] = useState<NotesTab>("purchased");

  const purchasedNotes = dummyData.filter((note) => note.isPurchased);
  const uploadedNotes = dummyData.filter((note) => note.isUploaded);
  const notesToShow =
    activeTab === "purchased" ? purchasedNotes : uploadedNotes;
  const isEmpty = notesToShow.length === 0;

  const handleOpenNote = (noteID: number) => {
    navigate(`/note/${noteID}`, {
      state: { mode: activeTab },
    });
  };

  return (
    <Main>
      <Navbar />
      <NotesTabBarContainer>
        <NotesTabBar
          activateTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      </NotesTabBarContainer>

      {["purchased", "uploaded"].includes(activeTab) && !isEmpty && (
        <Grid>
          {notesToShow.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => handleOpenNote(note.id)}
            />
          ))}
        </Grid>
      )}

      {/* --- EMPTY STATE --- */}
      {["purchased", "uploaded"].includes(activeTab) && isEmpty && (
        <NoNotesWrapper>
          <NoNotesText>
            {activeTab === "purchased" ? noPurchaseYet : noUploadsYet}
          </NoNotesText>
          <EmptyIllustration src={OxNoUpload} alt="No notes yet" />
          {activeTab === "uploaded" && (
            <UploadNoteCTAButton onClick={() => navigate("/my-notes/upload")}>
              {uploadFirstNote} <CirclePlus size={34} />
            </UploadNoteCTAButton>
          )}
        </NoNotesWrapper>
      )}
    </Main>
  );
}
