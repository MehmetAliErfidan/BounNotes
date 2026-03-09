import { Trash2, Dot } from "lucide-react";
import type { Note, NoteAsset, NoteComment } from "../../config/note.types";
import type { NotePermissions } from "./NotePermissions";
import { NOTE_DETAIL_TEXTS } from "../../i18n/translations/notes/NoteDetail";
import { useLang } from "../../i18n";
import Tooltip from "../tooltip/Tooltip";

import {
  Wrapper,
  Header,
  Title,
  Content,
  Meta,
  Course,
  Teacher,
  DescriptionBox,
  DateRow,
  CourseDate,
  CourseYear,
  CourseTerm,
  UploadDate,
  Description,
  PdfPreview,
  AssetList,
  AssetLink,
  AssetRow,
  ImageGrid,
  ImagePreview,
  ImageCard,
  ImageDeleteButton,
  BuyRow,
  Price,
  BuyButton,
  DeleteButton,
  CommentsSection,
  CommentsHeader,
  CommentsTitle,
  CommentsList,
  CommentItem,
  CommentMeta,
  CommentAuthor,
  CommentDate,
  CommentContent,
  CommentDeleteButton,
  CommentForm,
  CommentInput,
  CommentSubmitButton,
  CommentErrorText,
  CommentEmptyText,
} from "./!NoteDetail.styled";
import UserActionsRow from "./my-notes/UserActionsRow";

type Props = {
  note: Note;
  assets?: NoteAsset[];
  assetUrls?: Record<number, string>;
  onBuy?: () => void;
  onDeleteNote?: () => void;
  onDeleteAsset?: (assetId: number) => void;
  permissions?: NotePermissions;
  onDownload?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  isLiked?: boolean;
  isDisliked?: boolean;
  onEdit?: () => void;
  comments?: NoteComment[];
  commentsLoading?: boolean;
  commentText?: string;
  commentError?: string;
  commentSubmitting?: boolean;
  isCommentsOpen?: boolean;
  currentUserId?: number | null;
  onCommentTextChange?: (value: string) => void;
  onCreateComment?: () => void;
  onDeleteComment?: (commentId: number) => void;
  onToggleComments?: () => void;
};

export default function NoteDetailUI({
  note,
  assets = [],
  assetUrls = {},
  onBuy,
  onDeleteNote,
  onDeleteAsset,
  permissions,
  onDownload,
  onLike,
  onDislike,
  isLiked = false,
  isDisliked = false,
  onEdit,
  comments = [],
  commentsLoading = false,
  commentText = "",
  commentError = "",
  commentSubmitting = false,
  isCommentsOpen = false,
  currentUserId = null,
  onCommentTextChange,
  onCreateComment,
  onDeleteComment,
  onToggleComments,
}: Props) {
  const { lang } = useLang();
  const {
    buyText,
    deleteNote,
    alreadyDelisted,
    openPdf,
    pdfPreviewPlaceholder,
    noAssetsUploadedYet,
    loadingAssets,
    springTerm,
    summerTerm,
    fallTerm,
    commentsTitle,
    noCommentsYet,
    loadingComments,
    commentPlaceholder,
    sendComment,
    sendingComment,
    deleteComment,
  } = NOTE_DETAIL_TEXTS[lang];

  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const formatUiDate = (dateValue: string) => {
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return dateValue;
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsedDate);
  };
  const shortDate = formatUiDate(note.createdAt);

  const termLabelMap = {
    spring: springTerm,
    summer: summerTerm,
    fall: fallTerm,
  } as const;

  if (!permissions) {
    throw new Error("NoteDetailUI requires permissions");
  }

  const p = permissions;

  const canEdit = p.canEdit;
  const canDownload = p.canDownload;
  const canRate = p.canRate;
  const showUserInfo = p.showUserInfo;
  const canComment = p.canComment;

  // permissions will come from backend when auth is implemented

  const showBuy = p.canBuy && !!onBuy;
  const pdfAsset = assets.find((a) => a.assetType === "pdf");
  const imageAssets = assets
    .filter((a) => a.assetType === "image")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const hasRenderableAssets = assets.some((asset) =>
    Boolean(assetUrls[asset.id]),
  );

  return (
    <Wrapper>
      <Header>
        <Title>{note.title}</Title>
        {canEdit && (
          <Tooltip content={note.isListed ? deleteNote : alreadyDelisted}>
            <DeleteButton
              type="button"
              onClick={onDeleteNote}
              disabled={!note.isListed}
            >
              <Trash2 color="#ef4444" size={18} />
            </DeleteButton>
          </Tooltip>
        )}
      </Header>

      <Content>
        <Meta>
          <Course>{note.course}</Course>
          <Teacher>{note.teacher}</Teacher>
        </Meta>

        <DescriptionBox>
          <DateRow>
            <CourseDate>
              <CourseYear>{note.year}</CourseYear>
              <CourseTerm>{termLabelMap[note.term] ?? note.term}</CourseTerm>
            </CourseDate>
            <Dot color="#d1d5db" size={16} />
            <UploadDate>{shortDate}</UploadDate>
          </DateRow>
          <Description>{note.description}</Description>
        </DescriptionBox>

        <UserActionsRow
          note={note}
          canEdit={canEdit}
          canDownload={canDownload}
          canRate={canRate}
          showUserInfo={showUserInfo}
          canComment={canComment}
          onDownload={onDownload}
          onLike={onLike}
          onDislike={onDislike}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onEdit={onEdit}
          onCommentClick={onToggleComments}
          isCommentsOpen={isCommentsOpen}
        />

        {p.canBuy && <PdfPreview>{pdfPreviewPlaceholder}</PdfPreview>}

        {(p.canDownload || canEdit) && (
          <PdfPreview>
            {assets.length === 0 ? (
              noAssetsUploadedYet
            ) : !hasRenderableAssets ? (
              loadingAssets
            ) : (
              <AssetList>
                {pdfAsset && assetUrls[pdfAsset.id] && (
                  <AssetRow>
                    <AssetLink
                      href={assetUrls[pdfAsset.id]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {openPdf}
                    </AssetLink>
                  </AssetRow>
                )}
                <ImageGrid>
                  {imageAssets
                    .filter((asset) => Boolean(assetUrls[asset.id]))
                    .map((asset) => (
                      <ImageCard key={asset.id}>
                        <ImagePreview
                          src={assetUrls[asset.id]}
                          alt={`note-image-${asset.sortOrder + 1}`}
                        />
                        {canEdit && onDeleteAsset && (
                          <ImageDeleteButton
                            type="button"
                            onClick={() => onDeleteAsset(asset.id)}
                          >
                            <Trash2 size={14} />
                          </ImageDeleteButton>
                        )}
                      </ImageCard>
                    ))}
                </ImageGrid>
              </AssetList>
            )}
          </PdfPreview>
        )}

        {isCommentsOpen && (
          <CommentsSection>
            <CommentsHeader>
              <CommentsTitle>{commentsTitle}</CommentsTitle>
            </CommentsHeader>

            {commentError ? <CommentErrorText>{commentError}</CommentErrorText> : null}

            {commentsLoading ? (
              <CommentEmptyText>{loadingComments}</CommentEmptyText>
            ) : comments.length === 0 ? (
              <CommentEmptyText>{noCommentsYet}</CommentEmptyText>
            ) : (
              <CommentsList>
                {comments.map((comment) => {
                  const canDelete =
                    currentUserId !== null && Number(comment.userId) === Number(currentUserId);

                  const parsedCreatedAt = new Date(comment.createdAt);
                  const commentDate = Number.isNaN(parsedCreatedAt.getTime())
                    ? comment.createdAt
                    : formatUiDate(comment.createdAt);

                  return (
                    <CommentItem key={comment.id}>
                      <CommentMeta>
                        <CommentAuthor>{comment.username}</CommentAuthor>
                        <CommentDate>{commentDate}</CommentDate>
                      </CommentMeta>
                      <CommentContent>{comment.content}</CommentContent>
                      {canDelete && onDeleteComment ? (
                        <CommentDeleteButton
                          type="button"
                          onClick={() => onDeleteComment(comment.id)}
                        >
                          {deleteComment}
                        </CommentDeleteButton>
                      ) : null}
                    </CommentItem>
                  );
                })}
              </CommentsList>
            )}

            {p.canComment && onCommentTextChange && onCreateComment ? (
              <CommentForm
                onSubmit={(e) => {
                  e.preventDefault();
                  onCreateComment();
                }}
              >
                <CommentInput
                  value={commentText}
                  onChange={(e) => onCommentTextChange(e.target.value)}
                  placeholder={commentPlaceholder}
                  maxLength={1000}
                />
                <CommentSubmitButton
                  type="submit"
                  disabled={!commentText.trim() || commentSubmitting}
                >
                  {commentSubmitting ? sendingComment : sendComment}
                </CommentSubmitButton>
              </CommentForm>
            ) : null}
          </CommentsSection>
        )}

        {showBuy && (
          <BuyRow>
            <Price>₺{note.price}</Price>
            <BuyButton onClick={onBuy}>{buyText}</BuyButton>
          </BuyRow>
        )}
      </Content>
    </Wrapper>
  );
}
