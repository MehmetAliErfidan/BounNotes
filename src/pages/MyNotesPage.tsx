import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
} from "./!MyNotesPage.styled";
import OxNoUpload from "../assets/illustrations/no-uploads-yet/OxNoUpload.jpg";
import { Main } from "../styles/GlobalStyles";
import type { NotesTab } from "../components/note/my-notes/NotesTabBar.types";
import { dummyData } from "../data/dummyData";
import NoteCard from "../components/note/NoteCard";

export default function MyNotesPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { noPurchaseYet, noUploadsYet } = MY_NOTE_PAGE_TEXTS[lang];

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

      {activeTab === "purchased" && !isEmpty && (
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

      {activeTab === "uploaded" && !isEmpty && (
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

      {activeTab === "purchased" && isEmpty && (
        <NoNotesWrapper>
          <NoNotesText>{noPurchaseYet}</NoNotesText>
          <EmptyIllustration src={OxNoUpload} alt="No notes yet" />
        </NoNotesWrapper>
      )}

      {activeTab === "uploaded" && isEmpty && (
        <NoNotesWrapper>
          <NoNotesText>{noUploadsYet}</NoNotesText>
          <EmptyIllustration src={OxNoUpload} alt="No notes yet" />
        </NoNotesWrapper>
      )}
    </Main>
  );
}
