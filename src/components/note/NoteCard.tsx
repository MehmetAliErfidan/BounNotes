import { useNavigate } from "react-router-dom";
import useOpenUserProfile from "../../hooks/useOpenUserProfile";
import { NOTE_CARD_TEXTS } from "../../i18n/translations/notes/NoteCard";
import { useLang } from "../../i18n";
import type { NoteCardProps } from "../../config/note.types";

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
  Price,
  CTAButton,
} from "./!NoteCard.styled";

export default function NoteCard({ note, onOpen }: NoteCardProps) {
  const { lang } = useLang();
  const { seeDetailText } = NOTE_CARD_TEXTS[lang];
  const navigate = useNavigate();
  const openUserProfile = useOpenUserProfile();

  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    } else {
      navigate(`/note/${note.id}`);
    }
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
        <UserRow onClick={() => openUserProfile(note.owner.username)}>
          <Avatar>{note.owner.username[0]?.toUpperCase() ?? "?"}</Avatar>
          <Username>{note.owner.username}</Username>
        </UserRow>

        <RatingPriceRow>
          <Price>{note.price}</Price>
        </RatingPriceRow>

        <CTAButton onClick={handleOpen}>{seeDetailText}</CTAButton>
      </Bottom>
    </Card>
  );
}
