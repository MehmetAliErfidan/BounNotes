import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetailUI from "../components/note/NoteDetailUI";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { notePermissionsFromContext } from "../components/note/notePermissionsFromContext";
import type {
  Note,
  NoteAsset,
  NoteWithContext,
  NoteComment,
} from "../config/note.types";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import { NOTE_DETAIL_TEXTS } from "../i18n/translations/pages/NoteDetail";
import { useLang } from "../i18n";
import { API_BASE_URL } from "../config/api";
import { useAppSelector } from "../features/hooks";
import * as S from "./!NoteDetailPage.styled";

export default function NoteDetailPage() {
  const { lang } = useLang();
  const {
    noteNotFound,
    loadingText,
    deleteModalTitle,
    deleteModalDescription,
    deleteModalCancel,
    deleteModalConfirm,
    deleteModalConfirmLoading,
    assetDeleteFailed,
    assetDeleteNetworkFailed,
    noteDeleteFailed,
    noteDeleteNetworkFailed,
    downloadablePdfNotFound,
    pdfNotReady,
    reactionUpdateFailed,
    commentsLoadFailed,
    commentCreateFailed,
    commentDeleteFailed,
  } = NOTE_DETAIL_TEXTS[lang];
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUserId = useAppSelector((state) =>
    state.auth.user?.id ? Number(state.auth.user.id) : null,
  );
  const [note, setNote] = useState<Note | null>(null);
  const [context, setContext] = useState<NoteWithContext["context"] | null>(
    null,
  );
  const [assets, setAssets] = useState<NoteAsset[]>([]);
  const [assetUrls, setAssetUrls] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [assetActionError, setAssetActionError] = useState("");
  const [noteActionError, setNoteActionError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [reactionError, setReactionError] = useState("");
  const [comments, setComments] = useState<NoteComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const loadComments = async () => {
    if (!id) return;

    try {
      setCommentsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/comments/note/${id}`, {
        headers: buildOptionalAuthHeaders(),
      });

      if (!res.ok) {
        setComments([]);
        setCommentError(commentsLoadFailed);
        return;
      }

      const data = (await res.json()) as NoteComment[];
      setComments(data);
    } catch {
      setComments([]);
      setCommentError(commentsLoadFailed);
    } finally {
      setCommentsLoading(false);
    }
  };

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
        setIsLiked(data.context.isLiked);
        setIsDisliked(false);
        setCommentError("");
        await loadComments();

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

  const postReaction = async (reaction: "like" | "dislike") => {
    const res = await fetch(`${API_BASE_URL}/api/reactions/note/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(
          new Headers(buildOptionalAuthHeaders()).entries(),
        ),
      },
      body: JSON.stringify({ reaction }),
    });
    return res;
  };

  const deleteReaction = async () => {
    const res = await fetch(`${API_BASE_URL}/api/reactions/note/${id}`, {
      method: "DELETE",
      headers: buildOptionalAuthHeaders(),
    });
    return res;
  };

  const handleLike = async () => {
    if (!note || !id) return;
    setReactionError("");

    const prevLiked = isLiked;
    const prevDisliked = isDisliked;
    const prevStats = note.stats;

    try {
      if (isLiked) {
        setIsLiked(false);
        setNote({
          ...note,
          stats: {
            ...note.stats,
            likeCount: Math.max(0, note.stats.likeCount - 1),
          },
        });

        const res = await deleteReaction();
        if (!res.ok) throw new Error("REACTION_DELETE_FAILED");
        return;
      }

      const nextLikeCount = note.stats.likeCount + 1;
      const nextDislikeCount = isDisliked
        ? Math.max(0, note.stats.dislikeCount - 1)
        : note.stats.dislikeCount;

      setIsLiked(true);
      setIsDisliked(false);
      setNote({
        ...note,
        stats: { likeCount: nextLikeCount, dislikeCount: nextDislikeCount },
      });

      const res = await postReaction("like");
      if (!res.ok) throw new Error("REACTION_SET_FAILED");
    } catch {
      setIsLiked(prevLiked);
      setIsDisliked(prevDisliked);
      setNote({ ...note, stats: prevStats });
      setReactionError(reactionUpdateFailed);
    }
  };
  const handleBuy = () => {
    navigate(`/note/${note.id}/buy`);
  };

  const handleDislike = async () => {
    if (!note || !id) return;

    setReactionError("");
    const prevLiked = isLiked;
    const prevDisliked = isDisliked;
    const prevStats = note.stats;

    try {
      if (isDisliked) {
        setIsDisliked(false);
        setNote({
          ...note,
          stats: {
            ...note.stats,
            dislikeCount: Math.max(0, note.stats.dislikeCount - 1),
          },
        });

        const res = await deleteReaction();
        if (!res.ok) throw new Error("REACTION_DELETE_FAILED");
        return;
      }

      const nextDislikeCount = note.stats.dislikeCount + 1;
      const nextLikeCount = isLiked
        ? Math.max(0, note.stats.likeCount - 1)
        : note.stats.likeCount;

      setIsDisliked(true);
      setIsLiked(false);
      setNote({
        ...note,
        stats: { likeCount: nextLikeCount, dislikeCount: nextDislikeCount },
      });

      const res = await postReaction("dislike");
      if (!res.ok) throw new Error("REACTION_SET_FAILED");
    } catch {
      setIsLiked(prevLiked);
      setIsDisliked(prevDisliked);
      setNote({ ...note, stats: prevStats });
      setReactionError(reactionUpdateFailed);
    }
  };

  const handleDownload = () => {
    setAssetActionError("");

    const pdfAsset = assets.find((a) => a.assetType === "pdf");
    if (!pdfAsset) {
      setAssetActionError(downloadablePdfNotFound);
      return;
    }

    const url = assetUrls[pdfAsset.id];
    if (!url) {
      setAssetActionError(pdfNotReady);
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = `note-${note?.id ?? "file"}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleOpenDeleteModal = () => {
    if (!note || !note.isListed) return;
    setNoteActionError("");
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeletingNote) return;
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAsset = async (assetId: number) => {
    try {
      setAssetActionError("");

      let res = await fetch(`${API_BASE_URL}/api/assets/asset/${assetId}`, {
        method: "DELETE",
        headers: buildOptionalAuthHeaders(),
      });

      // Backward compatibility if backend still runs an older route shape.
      if (res.status === 404 || res.status === 405) {
        res = await fetch(`${API_BASE_URL}/api/assets/asset/${assetId}/file`, {
          method: "DELETE",
          headers: buildOptionalAuthHeaders(),
        });
      }

      if (!res.ok) {
        let message = assetDeleteFailed;
        try {
          const data = (await res.json()) as {
            message?: string;
            error?: string;
          };
          message = data.message || data.error || message;
        } catch {
          // keep default error text
        }
        setAssetActionError(message);
        return;
      }
      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    } catch {
      setAssetActionError(assetDeleteNetworkFailed);
    }
  };

  const handleDeleteNote = async () => {
    if (!note) return;
    try {
      setIsDeletingNote(true);
      setNoteActionError("");
      const res = await fetch(`${API_BASE_URL}/api/notes/${note.id}`, {
        method: "DELETE",
        headers: buildOptionalAuthHeaders(),
      });
      if (!res.ok) {
        let message = noteDeleteFailed;
        try {
          const data = (await res.json()) as {
            message?: string;
            error?: string;
          };
          message = data.message || data.error || message;
        } catch {
          // keep default
        }
        setNoteActionError(message);
        return;
      }
      setIsDeleteModalOpen(false);
      navigate("/my-notes?status=delisted");
    } catch {
      setNoteActionError(noteDeleteNetworkFailed);
    } finally {
      setIsDeletingNote(false);
    }
  };

  const handleEdit = async () => {
    navigate(`/note/${note?.id}/edit`);
  };

  const handleCreateComment = async () => {
    if (!id || !commentText.trim() || commentSubmitting) return;

    try {
      setCommentSubmitting(true);
      setCommentError("");

      const res = await fetch(`${API_BASE_URL}/api/comments/note/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(
            new Headers(buildOptionalAuthHeaders()).entries(),
          ),
        },
        body: JSON.stringify({ content: commentText.trim() }),
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as {
          message?: string;
          error?: string;
        } | null;
        setCommentError(
          errorData?.message || errorData?.error || commentCreateFailed,
        );
        return;
      }

      setCommentText("");
      await loadComments();
    } catch {
      setCommentError(commentCreateFailed);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      setCommentError("");

      const res = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: buildOptionalAuthHeaders(),
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as {
          message?: string;
          error?: string;
        } | null;
        setCommentError(
          errorData?.message || errorData?.error || commentDeleteFailed,
        );
        return;
      }

      await loadComments();
    } catch {
      setCommentError(commentDeleteFailed);
    }
  };

  return (
    <>
      <Navbar />
      <Main>
        {assetActionError && <S.InlineError>{assetActionError}</S.InlineError>}
        {reactionError && <S.InlineError>{reactionError}</S.InlineError>}
        {noteActionError && <S.InlineError>{noteActionError}</S.InlineError>}
        <NoteDetailUI
          note={note}
          assets={assets}
          assetUrls={assetUrls}
          permissions={notePermissionsFromContext(context)}
          onBuy={handleBuy}
          onDeleteNote={handleOpenDeleteModal}
          onDeleteAsset={handleDeleteAsset}
          onDownload={handleDownload}
          onLike={handleLike}
          onDislike={handleDislike}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onEdit={handleEdit}
          comments={comments}
          commentsLoading={commentsLoading}
          commentText={commentText}
          commentError={commentError}
          commentSubmitting={commentSubmitting}
          isCommentsOpen={isCommentsOpen}
          currentUserId={currentUserId}
          onCommentTextChange={setCommentText}
          onCreateComment={handleCreateComment}
          onDeleteComment={handleDeleteComment}
          onToggleComments={() => setIsCommentsOpen((prev) => !prev)}
        />

        {isDeleteModalOpen && (
          <S.ModalOverlay onClick={handleCloseDeleteModal}>
            <S.ModalCard onClick={(e) => e.stopPropagation()}>
              <S.ModalTitle>{deleteModalTitle}</S.ModalTitle>
              <S.ModalDescription>{deleteModalDescription}</S.ModalDescription>
              {noteActionError && (
                <S.InlineError>{noteActionError}</S.InlineError>
              )}
              <S.ModalActions>
                <S.CancelButton
                  type="button"
                  onClick={handleCloseDeleteModal}
                  disabled={isDeletingNote}
                >
                  {deleteModalCancel}
                </S.CancelButton>
                <S.ConfirmButton
                  type="button"
                  onClick={() => {
                    void handleDeleteNote();
                  }}
                  disabled={isDeletingNote}
                >
                  {isDeletingNote
                    ? deleteModalConfirmLoading
                    : deleteModalConfirm}
                </S.ConfirmButton>
              </S.ModalActions>
            </S.ModalCard>
          </S.ModalOverlay>
        )}
      </Main>
    </>
  );
}
