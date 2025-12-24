import { Star, MessageSquareText } from "lucide-react";
import type { NoteCardProps } from "./NoteTypes";
import { NOTE_DETAIL_TEXTS } from "../../i18n/translations/notes/NoteDetail";
import { useLang } from "../../i18n";

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
  UserRatingRow,
  UserInfo,
  Avatar,
  Username,
  RatingActions,
  Stars,
  CommentButton,
  PdfPreview,
  BuyRow,
  Price,
  BuyButton,
} from "./!NoteDetail.styled";

export default function NoteDetail({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { buyText } = NOTE_DETAIL_TEXTS[lang];

  return (
    <Wrapper>
      <Header>
        <Title>{note.title}</Title>
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

        <UserRatingRow>
          <UserInfo>
            <Avatar>{note.username[0]?.toUpperCase()}</Avatar>
            <Username>{note.username}</Username>
          </UserInfo>

          <RatingActions>
            <Stars>
              {[...Array(5)].map((_, index) => (
                <Star
                  size={16}
                  fill="none"
                  color={index < note.rating ? "#facc15" : "#d1d5db"}
                  strokeWidth={2}
                />
              ))}
            </Stars>

            <CommentButton>
              <MessageSquareText size={18} />
            </CommentButton>
          </RatingActions>
        </UserRatingRow>

        <PdfPreview>PDF preview will be shown here</PdfPreview>

        <BuyRow>
          <Price>{note.price}</Price>
          <BuyButton>{buyText}</BuyButton>
        </BuyRow>
      </Content>
    </Wrapper>
  );
}
