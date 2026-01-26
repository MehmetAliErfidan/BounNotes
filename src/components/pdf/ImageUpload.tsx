import { Images } from "lucide-react";
import * as S from "./!ImageUpload.styled";
import { IMAGE_UPLOAD_TEXTS } from "../../i18n/translations/pdf/ImageUpload";
import { useLang } from "../../i18n";

type Props = {
  images: File[];
  onChange: (images: File[]) => void;
  min?: number;
  max?: number;
};

export default function ImageUpload({
  images,
  onChange,
  min = 1,
  max = 3,
}: Props) {
  const { lang } = useLang();
  const { onlyImageFiles, previewTitleText, minImagesError, deleteImage } =
    IMAGE_UPLOAD_TEXTS[lang];

  const canAddMore = images.length < max;

  const handleAdd = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert(onlyImageFiles);
      return;
    }

    if (!canAddMore) return;
    onChange([...images, file]);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <S.Container>
      <S.Card>
        <S.SectionHeader>
          <Images /> {previewTitleText} ({images.length} / {max})
        </S.SectionHeader>
        <S.ImagesRow $full={images.length === max}>
          {images.map((img, i) => (
            <S.ImageCard key={i}>
              <S.PreviewImage src={URL.createObjectURL(img)} />
              <S.RemoveButton onClick={() => handleRemove(i)}>
                {deleteImage}
              </S.RemoveButton>
            </S.ImageCard>
          ))}
        </S.ImagesRow>
        <S.FileInput
          type="file"
          accept="image/*"
          disabled={!canAddMore}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleAdd(file);
            e.currentTarget.value = "";
          }}
        />
        {images.length < min && (
          <S.ErrorText>
            {minImagesError.replace("{{min}}", String(min))}
          </S.ErrorText>
        )}
      </S.Card>
    </S.Container>
  );
}
