import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import NoteForm from "../components/note/NoteForm.tsx";
import { validateNote } from "../config/note.validation";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import * as S from "./!NoteUploadPage.styled.ts";
import type { FormNote } from "../config/note.types.ts";
import ImageUpload from "../components/pdf/ImageUpload.tsx";
import PdfUpload from "../components/pdf/PDFUpload.tsx";
import { API_BASE_URL } from "../config/api.ts";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest.ts";
import { useLang } from "../i18n/index.tsx";
import { CREATE_NOTE_TEXTS } from "../i18n/translations/notes/CreateNote.ts";

export default function NoteUploadPage() {
  const { lang } = useLang();
  const {
    uploadText,
    uploadingText,
    retryUploadText,
    uploadFailed,
    rollbackFailedText,
    headerText,
    headerExplanation,
  } = CREATE_NOTE_TEXTS[lang];

  const [note, setNote] = useState<FormNote>({
    course: "",
    term: "",
    year: "",
    teacher: "",
    title: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canRetry, setCanRetry] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const validation = validateNote(note, images, pdfFile);
  const canSubmit = validation.canSubmit;

  const readErrorMessage = async (res: Response): Promise<string> => {
    try {
      const data = (await res.json()) as { message?: string; error?: string };
      return data.message || data.error || uploadFailed;
    } catch {
      return uploadFailed;
    }
  };

  const uploadAsset = async (
    noteId: number,
    file: File,
    assetType: "image" | "pdf",
    sortOrder: number,
  ) => {
    const uploadRes = await fetch(`${API_BASE_URL}/api/assets/note/${noteId}/upload`, {
      method: "POST",
      headers: {
        ...Object.fromEntries(
          new Headers(buildOptionalAuthHeaders()).entries(),
        ),
        "Content-Type": file.type,
        "x-asset-type": assetType,
        "x-file-name": encodeURIComponent(file.name),
        "x-sort-order": String(sortOrder),
      },
      body: file,
    });

    if (!uploadRes.ok) {
      const msg = await readErrorMessage(uploadRes);
      throw new Error(msg);
    }
  };

  const rollbackCreatedNote = async (noteId: number): Promise<boolean> => {
    try {
      const rollbackRes = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          ...Object.fromEntries(
            new Headers(buildOptionalAuthHeaders()).entries(),
          ),
        },
      });
      return rollbackRes.ok;
    } catch {
      return false;
    }
  };

  const submitNote = async () => {
    if (!note.term) return;
    let createdNoteId: number | null = null;

    try {
      setIsSubmitting(true);
      setCanRetry(false);
      setSubmitError("");

      const res = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(
            new Headers(buildOptionalAuthHeaders()).entries(),
          ),
        },
        body: JSON.stringify({
          title: note.title,
          course: note.course,
          term: note.term,
          year: note.year,
          teacher: note.teacher,
          description: note.description,
          price: note.price,
        }),
      });

      if (!res.ok) {
        setSubmitError(await readErrorMessage(res));
        return;
      }

      const createdNote = (await res.json()) as { id?: number };
      const noteId = createdNote.id;
      if (!noteId) {
        setSubmitError(uploadFailed);
        return;
      }
      createdNoteId = noteId;

      for (let i = 0; i < images.length; i += 1) {
        await uploadAsset(noteId, images[i], "image", i);
      }
      if (pdfFile) {
        await uploadAsset(noteId, pdfFile, "pdf", 0);
      }

      navigate("/my-notes");
    } catch (err) {
      if (createdNoteId !== null) {
        const rolledBack = await rollbackCreatedNote(createdNoteId);
        if (!rolledBack) {
          setSubmitError(rollbackFailedText);
          setCanRetry(false);
          return;
        }
      }

      if (err instanceof Error && err.message) {
        setSubmitError(err.message);
      } else {
        setSubmitError(uploadFailed);
      }
      setCanRetry(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitNote();
  };

  return (
    <Main>
      <Navbar />
      <S.PageContainer>
        <S.ContentContainer>
          <S.PageHeader>
            <h1>{headerText}</h1>
            <p>{headerExplanation}</p>
          </S.PageHeader>
          <form onSubmit={handleSubmit}>
            <S.FlexContainer>
              <S.NoteFormWrapper>
                <NoteForm note={note} setNote={setNote} />
              </S.NoteFormWrapper>
              <S.FileUploadContainer>
                <ImageUpload
                  images={images}
                  onChange={setImages}
                  min={1}
                  max={3}
                />
                <PdfUpload file={pdfFile} onChange={setPdfFile} />
                <S.SubmitArea>
                  <S.SubmitButton
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    <CirclePlus size={18} />
                    {isSubmitting ? uploadingText : uploadText}
                  </S.SubmitButton>
                </S.SubmitArea>
              </S.FileUploadContainer>
            </S.FlexContainer>
          </form>
          {submitError && (
            <>
              <p>{submitError}</p>
              {canRetry && (
                <S.SubmitArea>
                  <S.SubmitButton
                    type="button"
                    onClick={() => {
                      void submitNote();
                    }}
                    disabled={isSubmitting}
                  >
                    <CirclePlus size={18} />
                    {isSubmitting ? uploadingText : retryUploadText}
                  </S.SubmitButton>
                </S.SubmitArea>
              )}
            </>
          )}
        </S.ContentContainer>
      </S.PageContainer>
    </Main>
  );
}
