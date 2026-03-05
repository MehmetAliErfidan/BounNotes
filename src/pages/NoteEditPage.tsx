import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import NoteForm from "../components/note/NoteForm";
import ImageUpload from "../components/pdf/ImageUpload";
import PdfUpload from "../components/pdf/PDFUpload";
import { Main } from "../styles/GlobalStyles";
import { API_BASE_URL } from "../config/api";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import { useLang } from "../i18n";
import { NOTE_EDIT_TEXTS } from "../i18n/translations/pages/NoteEdit";
import { Images } from "lucide-react";
import type {
  FormNote,
  NoteAsset,
  NoteWithContext,
} from "../config/note.types";
import * as S from "./!NoteEditPage.styled";

export default function NoteEditPage() {
  const { lang } = useLang();
  const {
    invalidNoteId,
    noteNotFound,
    failedToLoadNote,
    failedToDeleteImage,
    minImageRequired,
    failedToSaveNote,
    imageUploadFailedAfterSave,
    pdfReplaceFailedAfterSave,
    loading: loadingText,
    title,
    subtitle,
    existingImages,
    noExistingImage,
    deletingImage,
    deleteImage,
    saving,
    saveChanges,
    saveSuccess,
    redirectingToDetail,
  } = NOTE_EDIT_TEXTS[lang];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [note, setNote] = useState<FormNote>({
    course: "",
    term: "",
    year: "",
    teacher: "",
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [assetError, setAssetError] = useState("");
  const [existingImageAssets, setExistingImageAssets] = useState<NoteAsset[]>(
    [],
  );
  const [existingImageUrls, setExistingImageUrls] = useState<
    Record<number, string>
  >({});
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deletingAssetId, setDeletingAssetId] = useState<number | null>(null);
  const [existingPdfAsset, setExistingPdfAsset] = useState<NoteAsset | null>(
    null,
  );
  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const redirectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!id) {
        setError(invalidNoteId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
          headers: buildOptionalAuthHeaders(),
        });

        if (!res.ok) {
          if (!isMounted) return;
          setError(noteNotFound);
          return;
        }

        const data = (await res.json()) as NoteWithContext;
        if (!isMounted) return;

        if (!data.context.isOwner) {
          navigate(`/note/${id}`, { replace: true });
          return;
        }

        setNote({
          title: data.note.title,
          course: data.note.course,
          term: data.note.term,
          year: data.note.year,
          teacher: data.note.teacher,
          description: data.note.description,
          price: data.note.price,
        });

        const assetsRes = await fetch(`${API_BASE_URL}/api/assets/note/${id}`, {
          headers: buildOptionalAuthHeaders(),
        });

        if (assetsRes.ok) {
          const assets = (await assetsRes.json()) as NoteAsset[];
          const imageAssets = assets
            .filter((asset) => asset.assetType === "image")
            .sort((a, b) => a.sortOrder - b.sortOrder);
          setExistingImageAssets(imageAssets);
          const pdfAsset =
            assets.find((asset) => asset.assetType === "pdf") ?? null;
          setExistingPdfAsset(pdfAsset);
        }
      } catch {
        if (!isMounted) return;
        setError(failedToLoadNote);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [id, navigate, invalidNoteId, noteNotFound, failedToLoadNote]);

  useEffect(() => {
    let isMounted = true;
    const createdObjectUrls: string[] = [];

    async function loadExistingImageUrls() {
      if (existingImageAssets.length === 0) {
        setExistingImageUrls((prev) => {
          Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
          return {};
        });
        return;
      }

      const nextUrls: Record<number, string> = {};

      await Promise.all(
        existingImageAssets.map(async (asset) => {
          try {
            const res = await fetch(
              `${API_BASE_URL}/api/assets/asset/${asset.id}/file`,
              {
                headers: buildOptionalAuthHeaders(),
              },
            );
            if (!res.ok) return;
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            createdObjectUrls.push(objectUrl);
            nextUrls[asset.id] = objectUrl;
          } catch {
            // Keep rendering any images that could be loaded.
          }
        }),
      );

      if (!isMounted) {
        createdObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      setExistingImageUrls((prev) => {
        Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
        return nextUrls;
      });
    }

    loadExistingImageUrls();

    return () => {
      isMounted = false;
      createdObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [existingImageAssets]);

  const canSave = useMemo(() => {
    if (!note.term) return false;
    if (!note.course || !note.teacher || !note.title || !note.description)
      return false;

    const year = Number(note.year);
    const price = Number(note.price);

    if (!Number.isInteger(year) || year < 2000) return false;
    if (!Number.isFinite(price) || price < 1) return false;

    const totalImages = existingImageAssets.length + newImages.length;
    if (totalImages < 1) return false;
    const hasPdf = Boolean(existingPdfAsset) || Boolean(newPdf);
    if (!hasPdf) return false;

    return true;
  }, [
    note,
    existingImageAssets.length,
    newImages.length,
    existingPdfAsset,
    newPdf,
  ]);

  const readErrorMessage = async (
    res: Response,
    fallback: string,
  ): Promise<string> => {
    try {
      const data = (await res.json()) as { message?: string; error?: string };
      return data.message || data.error || fallback;
    } catch {
      return fallback;
    }
  };

  const handleDeleteExistingImage = async (assetId: number) => {
    const totalImages = existingImageAssets.length + newImages.length;
    if (totalImages <= 1) {
      setAssetError(minImageRequired);
      return;
    }

    try {
      setAssetError("");
      setDeletingAssetId(assetId);
      const res = await fetch(`${API_BASE_URL}/api/assets/asset/${assetId}`, {
        method: "DELETE",
        headers: buildOptionalAuthHeaders(),
      });
      if (!res.ok) {
        setAssetError(await readErrorMessage(res, failedToDeleteImage));
        return;
      }
      setExistingImageAssets((prev) =>
        prev.filter((asset) => asset.id !== assetId),
      );
    } catch {
      setAssetError(failedToDeleteImage);
    } finally {
      setDeletingAssetId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !canSave || isSaving) return;

    try {
      setIsSaving(true);
      setError("");
      setAssetError("");
      setSuccessMessage("");

      const res = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        method: "PATCH",
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
        const data = (await res.json().catch(() => null)) as {
          message?: string;
          error?: string;
        } | null;
        setError(data?.message || data?.error || failedToSaveNote);
        return;
      }

      for (let i = 0; i < newImages.length; i += 1) {
        const file = newImages[i];
        const uploadRes = await fetch(
          `${API_BASE_URL}/api/assets/note/${id}/upload`,
          {
            method: "POST",
            headers: {
              ...Object.fromEntries(
                new Headers(buildOptionalAuthHeaders()).entries(),
              ),
              "Content-Type": file.type,
              "x-asset-type": "image",
              "x-file-name": encodeURIComponent(file.name),
              "x-sort-order": String(existingImageAssets.length + i),
            },
            body: file,
          },
        );

        if (!uploadRes.ok) {
          setError(
            await readErrorMessage(uploadRes, imageUploadFailedAfterSave),
          );
          return;
        }
      }

      if (newPdf) {
        const replacePdfRes = await fetch(
          `${API_BASE_URL}/api/assets/note/${id}/pdf`,
          {
            method: "PUT",
            headers: {
              ...Object.fromEntries(
                new Headers(buildOptionalAuthHeaders()).entries(),
              ),
              "Content-Type": "application/pdf",
              "x-file-name": encodeURIComponent(newPdf.name),
            },
            body: newPdf,
          },
        );
        if (!replacePdfRes.ok) {
          setError(
            await readErrorMessage(replacePdfRes, pdfReplaceFailedAfterSave),
          );
          return;
        }
      }

      setSuccessMessage(`${saveSuccess} ${redirectingToDetail}`);
      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate(`/note/${id}`);
      }, 800);
    } catch {
      setError(failedToSaveNote);
      setSuccessMessage("");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p>{loadingText}</p>;

  return (
    <Main>
      <Navbar />
      <S.PageContainer>
        <S.ContentContainer>
          <S.PageHeader>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </S.PageHeader>

          <form onSubmit={handleSave}>
            <S.FlexContainer>
              <S.NoteFormWrapper>
                <NoteForm note={note} setNote={setNote} />
              </S.NoteFormWrapper>
              <S.FileUploadContainer>
                <S.AssetSectionContainer>
                  <S.AssetSection>
                    <S.AssetSectionTitle>
                      <Images /> {existingImages}
                    </S.AssetSectionTitle>
                    {existingImageAssets.length === 0 ? (
                      <S.AssetHint>{noExistingImage}</S.AssetHint>
                    ) : (
                      <S.ExistingImagesRow>
                        {existingImageAssets.map((asset) => (
                          <S.ExistingImageCard key={asset.id}>
                            {existingImageUrls[asset.id] && (
                              <S.ExistingImagePreview
                                src={existingImageUrls[asset.id]}
                                alt={`existing-image-${asset.sortOrder + 1}`}
                              />
                            )}
                            <S.AssetActionButton
                              type="button"
                              onClick={() => {
                                void handleDeleteExistingImage(asset.id);
                              }}
                              disabled={
                                deletingAssetId === asset.id ||
                                existingImageAssets.length + newImages.length <=
                                  1
                              }
                            >
                              {deletingAssetId === asset.id
                                ? deletingImage
                                : deleteImage}
                            </S.AssetActionButton>
                          </S.ExistingImageCard>
                        ))}
                      </S.ExistingImagesRow>
                    )}
                  </S.AssetSection>
                </S.AssetSectionContainer>

                <ImageUpload
                  images={newImages}
                  onChange={setNewImages}
                  min={0}
                  max={Math.max(0, 3 - existingImageAssets.length)}
                />
                <PdfUpload file={newPdf} onChange={setNewPdf} />
              </S.FileUploadContainer>
            </S.FlexContainer>
            <S.StickySubmitBar>
              {successMessage && <S.SuccessText>{successMessage}</S.SuccessText>}
              <S.SubmitButton type="submit" disabled={!canSave || isSaving}>
                {isSaving ? saving : saveChanges}
              </S.SubmitButton>
            </S.StickySubmitBar>
          </form>

          {error && <S.InlineError>{error}</S.InlineError>}
          {assetError && <S.InlineError>{assetError}</S.InlineError>}
        </S.ContentContainer>
      </S.PageContainer>
    </Main>
  );
}
