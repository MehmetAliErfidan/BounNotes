import {
  MessageSquareText,
  Download,
  Pencil,
  Trash2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import type { Note } from "./NoteTypes";
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
  DateText,
  Description,
  UserActionsRow,
  UserInfo,
  Avatar,
  Username,
  RatingActions,
  LikeButtons,
  LikeButton,
  EditButton,
  DownloadButton,
  CommentButton,
  PdfPreview,
  BuyRow,
  Price,
  BuyButton,
  DeleteButton,
} from "./!NoteDetail.styled";

type NoteDetailMode = "market" | "purchased" | "uploaded" | "checkout";

type Props = {
  note: Note;
  onBuy?: () => void;
  mode?: NoteDetailMode;
};

export default function NoteDetailUI({ note, onBuy, mode = "market" }: Props) {
  const { lang } = useLang();
  const {
    buyText,
    download,
    edit,
    deleteNote,
    liked,
    like,
    dislike,
    disliked,
    makeComment,
  } = NOTE_DETAIL_TEXTS[lang];

  const isMarket = mode === "market";
  const isPurchased = mode === "purchased";
  const isUploaded = mode === "uploaded";
  // const isCheckout = mode === "checkout";  for future use

  return (
    <Wrapper>
      <Header>
        <Title>{note.title}</Title>
        {isUploaded && (
          <Tooltip content={deleteNote}>
            <DeleteButton>
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
          <DateText>{note.date}</DateText>
          <Description>{note.description}</Description>
        </DescriptionBox>

        <UserActionsRow>
          {!isUploaded && (
            <UserInfo>
              <Avatar>{note.username[0]?.toUpperCase()}</Avatar>
              <Username>{note.username}</Username>
            </UserInfo>
          )}

          {isUploaded && (
            <EditButton>
              <Pencil size={20} />
              <span>{edit}</span>
            </EditButton>
          )}

          {(isUploaded || isPurchased) && (
            <DownloadButton>
              <Download size={20} />
              <span>{download}</span>
            </DownloadButton>
          )}

          <RatingActions>
            {isMarket ||
              (isPurchased && (
                <LikeButtons>
                  <Tooltip content={note.isLiked ? liked : like} delay={300}>
                    <LikeButton>
                      <ThumbsUp />
                      <span>{note.likeCount}</span>
                    </LikeButton>
                  </Tooltip>

                  <Tooltip
                    content={note.isDisliked ? disliked : dislike}
                    delay={400}
                  >
                    <LikeButton>
                      <ThumbsDown />
                      <span>{note.dislikeCount}</span>
                    </LikeButton>
                  </Tooltip>
                </LikeButtons>
              ))}
            <Tooltip content={makeComment} delay={300}>
              <CommentButton>
                <MessageSquareText size={18} />
              </CommentButton>
            </Tooltip>
          </RatingActions>
        </UserActionsRow>

        {isMarket && <PdfPreview>PDF preview will be shown here</PdfPreview>}

        {isMarket && onBuy && (
          <BuyRow>
            <Price>{note.price}</Price>
            <BuyButton onClick={onBuy}>{buyText}</BuyButton>
          </BuyRow>
        )}
      </Content>
    </Wrapper>
  );
}
