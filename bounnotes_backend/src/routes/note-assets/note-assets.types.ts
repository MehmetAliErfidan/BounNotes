export type AssetType = "pdf" | "image";

export type NoteAssetItem = {
  id: number;
  noteId: number;
  assetType: AssetType;
  fileUrl: string;
  sortOrder: number;
  createdAt: string;
};

export type NoteAssetRow = {
  id: number;
  note_id: number;
  asset_type: AssetType;
  file_url: string;
  sort_order: number;
  created_at: Date | string;
};

export type CreateNoteAssetInput = {
  noteId: number;
  assetType: AssetType;
  fileUrl: string;
  sortOrder: number;
};
