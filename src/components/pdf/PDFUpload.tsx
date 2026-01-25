import { PDF_UPLOAD_TEXTS } from "../../i18n/translations/pdf/PDFUpload";
import { useLang } from "../../i18n";
import * as S from "./!PDFUpload.styled";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function PdfUpload({ file, onChange }: Props) {
  const { lang } = useLang();
  const { uploadPdfTitle, onlyPdfFiles, remove } = PDF_UPLOAD_TEXTS[lang];

  const handleSelect = (f: File) => {
    if (f.type !== "application/pdf") {
      alert(onlyPdfFiles);
      return;
    }
    onChange(f);
  };

  return (
    <S.Container>
      <S.Card>
        <S.Label>{uploadPdfTitle}</S.Label>

        <S.FileInput
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleSelect(file);
            e.currentTarget.value = "";
          }}
        />

        {file && (
          <S.PdfInfo>
            <span>{file.name}</span>
            <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            <S.RemoveButton onClick={() => onChange(null)}>
              {remove}
            </S.RemoveButton>
          </S.PdfInfo>
        )}
      </S.Card>
    </S.Container>
  );
}
