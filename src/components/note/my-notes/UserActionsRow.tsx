import * as S from "./!UserActionsRow.styled";
import {
  MessageSquareText,
  Download,
  Pencil,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { NOTE_DETAIL_TEXTS } from "../../../i18n/translations/notes/NoteDetail";
import { useLang } from "../../../i18n";

import Tooltip from "../../tooltip/Tooltip";
import type { Note } from "../NoteTypes";

type Props = {
  note: Note;
  canEdit: boolean;
  canDownload: boolean;
  canRate: boolean;
  showUserInfo: boolean;
  canComment: boolean;
};

export default function UserActionsRow({
  note,
  canEdit,
  canDownload,
  canRate,
  showUserInfo,
  canComment,
}: Props) {
  const { lang } = useLang();
  const { download, edit, liked, like, dislike, disliked, makeComment } =
    NOTE_DETAIL_TEXTS[lang];

  return (
    <S.UserActionsRow>
      {showUserInfo && (
        <S.UserInfo>
          <S.Avatar>{note.username[0]?.toUpperCase() ?? "?"}</S.Avatar>
          <S.Username>{note.username}</S.Username>
        </S.UserInfo>
      )}

      {canEdit && (
        <S.EditButton>
          <Pencil size={20} />
          <span>{edit}</span>
        </S.EditButton>
      )}

      {canDownload && (
        <S.DownloadButton>
          <Download size={20} />
          <span>{download}</span>
        </S.DownloadButton>
      )}

      <S.RatingActions>
        {canRate && (
          <S.LikeButtons>
            <Tooltip content={note.isLiked ? liked : like} delay={300}>
              <S.LikeButton>
                <ThumbsUp />
                <span>{note.likeCount}</span>
              </S.LikeButton>
            </Tooltip>

            <Tooltip content={note.isDisliked ? disliked : dislike} delay={400}>
              <S.LikeButton>
                <ThumbsDown />
                <span>{note.dislikeCount}</span>
              </S.LikeButton>
            </Tooltip>
          </S.LikeButtons>
        )}
        {canComment && (
          <Tooltip content={makeComment} delay={300}>
            <S.CommentButton>
              <MessageSquareText size={18} />
            </S.CommentButton>
          </Tooltip>
        )}
      </S.RatingActions>
    </S.UserActionsRow>
  );
}
