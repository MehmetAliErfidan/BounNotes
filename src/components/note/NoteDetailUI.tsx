import { Trash2, Dot } from "lucide-react";
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
  DateRow,
  CourseDate,
  CourseYear,
  CourseTerm,
  UploadDate,
  Description,
  PdfPreview,
  BuyRow,
  Price,
  BuyButton,
  DeleteButton,
} from "./!NoteDetail.styled";
import UserActionsRow from "./my-notes/UserActionsRow";

type NoteMode = "market" | "purchased" | "uploaded" | "checkout";

type Props = {
  note: Note;
  onBuy?: () => void;
  mode?: NoteMode;
};

export default function NoteDetailUI({ note, onBuy, mode = "market" }: Props) {
  const { lang } = useLang();
  const { buyText, deleteNote } = NOTE_DETAIL_TEXTS[lang];

  const isMarket = mode === "market";
  const isPurchased = mode === "purchased";
  const isUploaded = mode === "uploaded";
  // const isCheckout = mode === "checkout";  for future use

  const canEdit = isUploaded;
  const canDownload = isUploaded || isPurchased;
  const canRate = isPurchased;
  const showUserInfo = !isUploaded;
  const showBuy = isMarket && onBuy;
  const canComment = isPurchased || isUploaded;

  return (
    <Wrapper>
      <Header>
        <Title>{note.title}</Title>
        {canEdit && (
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
          <DateRow>
            <CourseDate>
              <CourseYear>{note.year}</CourseYear>
              <CourseTerm>{note.term}</CourseTerm>
            </CourseDate>
            <Dot color="#d1d5db" size={16} />
            <UploadDate>{note.date}</UploadDate>
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
        />

        {isMarket && <PdfPreview>PDF preview will be shown here</PdfPreview>}

        {showBuy && (
          <BuyRow>
            <Price>{note.price}</Price>
            <BuyButton onClick={onBuy}>{buyText}</BuyButton>
          </BuyRow>
        )}
      </Content>
    </Wrapper>
  );
}
