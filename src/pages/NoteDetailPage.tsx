import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetailUI from "../components/note/NoteDetailUI";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { notePermissionsFromContext } from "../components/note/notePermissionsFromContext";
import type { Note, NoteAsset, NoteWithContext } from "../config/note.types";
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
  const [assets, setAssets] = useState<NoteAsset[]>([]);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
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

        if (data.context.isOwner || data.context.isPurchased) {
          try {
            const assetsRes = await fetch(
              `${API_BASE_URL}/api/assets/note/${id}`,
              {
                headers: buildOptionalAuthHeaders(),
              },
            );

            if (assetsRes.ok) {
              const items = (await assetsRes.json()) as NoteAsset[];
              if (isMounted) setAssets(items);
            } else if (
              assetsRes.status === 401 ||
              assetsRes.status === 403 ||
              assetsRes.status === 404
            ) {
              if (isMounted) setAssets([]);
            } else {
              console.error("Failed to fetch assets:", assetsRes.status);
              if (isMounted) setAssets([]);
            }
          } catch (err) {
            console.error("Asset fetch network error:", err);
            if (isMounted) setAssets([]);
          }
        } else {
          setAssets([]);
        }
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

  useEffect(() => {
    let isMounted = true;
    const createdObjectUrls: string[] = [];

    async function loadAssetFiles() {
      if (assets.length === 0) {
        setAssetUrls((prev) => {
          Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
          return {};
        });
        return;
      }

      const nextUrls: Record<number, string> = {};

      await Promise.all(
        assets.map(async (asset) => {
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
            // Ignore per-file failures and continue rendering available files.
          }
        }),
      );

      if (!isMounted) {
        createdObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      setAssetUrls((prev) => {
        Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
        return nextUrls;
      });
    }

    loadAssetFiles();

    return () => {
      isMounted = false;
      createdObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [assets]);

  if (loading) return <p>{loadingText}</p>;
  if (hasError || !note || !context) return <p>{noteNotFound}</p>;

  const handleBuy = () => {
    navigate(`/note/${note.id}/buy`);
  };

  const handleDeleteAsset = async (assetId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/assets/asset/${assetId}`, {
        method: "DELETE",
        headers: buildOptionalAuthHeaders(),
      });
      if (!res.ok) {
        return;
      }
      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    } catch {
      // Keep the current UI state when delete fails.
    }
  };

  return (
    <>
      <Navbar />
      <Main>
        <NoteDetailUI
          note={note}
          assets={assets}
          assetUrls={assetUrls}
          permissions={notePermissionsFromContext(context)}
          onBuy={handleBuy}
          onDeleteAsset={handleDeleteAsset}
        />
      </Main>
    </>
  );
}
