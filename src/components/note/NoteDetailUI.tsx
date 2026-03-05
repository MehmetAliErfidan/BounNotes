import { Trash2, Dot } from "lucide-react";
import type { Note, NoteAsset } from "../../config/note.types";
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
  } = NOTE_DETAIL_TEXTS[lang];

  const parsedDate = new Date(note.createdAt);
  const shortDate = Number.isNaN(parsedDate.getTime())
    ? note.createdAt
    : new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(note.createdAt));

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
