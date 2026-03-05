import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import NoteCard from "../components/note/NoteCard";
import { API_BASE_URL } from "../config/api";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import type { Note } from "../config/note.types";

export default function MyNotesPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const {
    loadingText,
    loadFailedText,
    noPurchaseYet,
    noUploadsYet,
    uploadFirstNote,
    emptyStateImageAlt,
    delistSuccess,
  } = MY_NOTE_PAGE_TEXTS[lang];
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const showDelistSuccess = status === "delisted";

  const [activeTab, setActiveTab] = useState<NotesTab>("purchased");
  const [uploadedNotes, setUploadedNotes] = useState<Note[]>([]);
  const [purchasedNotes, setPurchasedNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadUploadedNotes = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await fetch(`${API_BASE_URL}/api/notes/me/uploaded`, {
          headers: buildOptionalAuthHeaders(),
        });

        const res2 = await fetch(`${API_BASE_URL}/api/notes/me/purchased`, {
          headers: buildOptionalAuthHeaders(),
        });

        if (!res.ok) {
          if (isMounted) setHasError(true);
          return;
        }

        if (!res2.ok) {
          if (isMounted) setHasError(true);
          return;
        }

        const purchasedData = (await res2.json()) as Note[];
        if (isMounted) setPurchasedNotes(purchasedData);

        const data = (await res.json()) as Note[];
        if (isMounted) setUploadedNotes(data);
      } catch {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUploadedNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const notesToShow =
    activeTab === "purchased" ? purchasedNotes : uploadedNotes;
  const isEmpty = notesToShow.length === 0;

  const handleOpenNote = (noteID: number) => {
    navigate(`/note/${noteID}`);
  };

  const dismissStatusMessage = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("status");
    setSearchParams(nextParams, { replace: true });
  };

  if (isLoading) return <p>{loadingText}</p>;
  if (hasError) return <p>{loadFailedText}</p>;

  return (
    <>
      <Navbar />
      <Main>
        {showDelistSuccess && (
          <NoNotesText onClick={dismissStatusMessage}>{delistSuccess}</NoNotesText>
        )}
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

        {["purchased", "uploaded"].includes(activeTab) && isEmpty && (
          <NoNotesWrapper>
            <NoNotesText>
              {activeTab === "purchased" ? noPurchaseYet : noUploadsYet}
            </NoNotesText>
            <EmptyIllustration src={OxNoUpload} alt={emptyStateImageAlt} />
            {activeTab === "uploaded" && (
              <UploadNoteCTAButton onClick={() => navigate("/my-notes/upload")}>
                {uploadFirstNote} <CirclePlus size={34} />
              </UploadNoteCTAButton>
            )}
          </NoNotesWrapper>
        )}
      </Main>
    </>
  );
}
