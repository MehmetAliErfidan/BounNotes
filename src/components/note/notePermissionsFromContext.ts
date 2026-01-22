import type { NotePermissions } from "./NotePermissions";

type NoteContext = {
  isOwner: boolean;
  isPurchased: boolean;
  isLiked: boolean;
};

export function notePermissionsFromContext(
  context: NoteContext,
): NotePermissions {
  const { isOwner, isPurchased } = context;

  return {
    canEdit: isOwner,
    canDownload: isOwner || isPurchased,
    canRate: isPurchased,
    canComment: isOwner || isPurchased,
    canBuy: !isOwner && !isPurchased,
    showUserInfo: !isOwner,
  };
}
