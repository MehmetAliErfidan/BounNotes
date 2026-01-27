import { useState } from "react";
import { CirclePlus } from "lucide-react";
import NoteForm from "../components/note/NoteForm.tsx";
import { validateNote } from "../config/note.validation";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import * as S from "./!NoteUploadPage.styled.ts";
import type { FormNote } from "../config/note.types.ts";
import ImageUpload from "../components/pdf/ImageUpload.tsx";
import PdfUpload from "../components/pdf/PDFUpload.tsx";
import { useLang } from "../i18n/index.tsx";
import { CREATE_NOTE_TEXTS } from "../i18n/translations/notes/CreateNote.ts";

export default function NoteUploadPage() {
  const { lang } = useLang();
  const { uploadText, headerText, headerExplanation } = CREATE_NOTE_TEXTS[lang];

  const [note, setNote] = useState<FormNote>({
    course: "",
    term: "",
    year: "",
    teacher: "",
    title: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const validation = validateNote(note, images, pdfFile);
  const canSubmit = validation.canSubmit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      note,
      images,
      pdf: pdfFile,
    };

    if (!payload.note.term) {
      console.log("Term is required");
      return;
    }

    console.log("Submitting payload:", payload);
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
                  <S.SubmitButton type="submit" disabled={!canSubmit}>
                    <CirclePlus size={18} />
                    {uploadText}
                  </S.SubmitButton>
                </S.SubmitArea>
              </S.FileUploadContainer>
            </S.FlexContainer>
          </form>
        </S.ContentContainer>
      </S.PageContainer>
    </Main>
  );
}
