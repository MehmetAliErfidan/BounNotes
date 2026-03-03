import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetailUI from "../components/note/NoteDetailUI";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { notePermissionsFromContext } from "../components/note/notePermissionsFromContext";
import type { Note, NoteWithContext } from "../config/note.types";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import { NOTE_DETAIL_TEXTS } from "../i18n/translations/pages/NoteDetail";
import { useLang } from "../i18n";
import { API_BASE_URL } from "../config/api";

export default function NoteDetailPage() {
  const { lang } = useLang();
  const { noteNotFound, loadingText } = NOTE_DETAIL_TEXTS[lang];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [context, setContext] = useState<NoteWithContext["context"] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadNote() {
      if (!id) {
        setHasError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setHasError(false);

        const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
          headers: buildOptionalAuthHeaders(),
        });
        if (!response.ok) {
          if (!isMounted) return;
          setHasError(true);
          return;
        }

        const data = (await response.json()) as NoteWithContext;
        if (!isMounted) return;

        setNote(data.note);
        setContext(data.context);
      } catch {
        if (!isMounted) return;
        setHasError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNote();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p>{loadingText}</p>;
  if (hasError || !note || !context) return <p>{noteNotFound}</p>;

  const handleBuy = () => {
    navigate(`/note/${note.id}/buy`);
  };

  return (
    <>
      <Navbar />
      <Main>
        <NoteDetailUI
          note={note}
          permissions={notePermissionsFromContext(context)}
          onBuy={handleBuy}
        />
      </Main>
    </>
  );
}
