import { useNavigate } from "react-router-dom";
import { NOTE_CARD_TEXTS } from "../../i18n/translations/notes/NoteCard";
import { useLang } from "../../i18n";
import type { NoteCardProps } from "./NoteTypes";

import {
  Card,
  TitleWrapper,
  Title,
  MetaWrapper,
  Course,
  Teacher,
  Bottom,
  UserRow,
  Avatar,
  Username,
  RatingPriceRow,
  Rating,
  Price,
  CTAButton,
} from "./!NoteCard.styled";

export default function NoteCard({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { seeDetailText } = NOTE_CARD_TEXTS[lang];
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <Card>
      <TitleWrapper>
        <Title>{note.title}</Title>
      </TitleWrapper>

      <MetaWrapper>
        <Course>{note.course}</Course>
        <Teacher>{note.teacher}</Teacher>
      </MetaWrapper>

      <Bottom>
        <UserRow>
          <Avatar>{note.username[0]?.toUpperCase()}</Avatar>
          <Username>{note.username}</Username>
        </UserRow>

        <RatingPriceRow>
          <Rating>{note.rating} / 5</Rating>
          <Price>{note.price}</Price>
        </RatingPriceRow>

        <CTAButton onClick={handleSeeDetail}>{seeDetailText}</CTAButton>
      </Bottom>
    </Card>
  );
}
