import { Trash2, Dot } from "lucide-react";
import type { Note } from "./NoteTypes";
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
  BuyRow,
  Price,
  BuyButton,
  DeleteButton,
} from "./!NoteDetail.styled";
import UserActionsRow from "./my-notes/UserActionsRow";

type Props = {
  note: Note;
  onBuy?: () => void;
  // new (backend-proof)
  permissions?: NotePermissions;
};

export default function NoteDetailUI({ note, onBuy, permissions }: Props) {
  const { lang } = useLang();
  const { buyText, deleteNote } = NOTE_DETAIL_TEXTS[lang];

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
              <CourseTerm>{note.term.toUpperCase()}</CourseTerm>
            </CourseDate>
            <Dot color="#d1d5db" size={16} />
            <UploadDate>{note.createdAt}</UploadDate>
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

        {p.canBuy && <PdfPreview>PDF preview will be shown here</PdfPreview>}

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
