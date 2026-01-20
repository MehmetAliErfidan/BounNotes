import {
  SwitchModeButton,
  ButtonContainer,
  UploadButton,
} from "./!NotesTabBar.styled";
import { NOTES_TAB_BAR_TEXTS } from "../../../i18n/translations/notes/NotesTabBar";
import { useLang } from "../../../i18n";
import type { NotesTab } from "./NotesTabBar.types";
import { Plus } from "lucide-react";
import Tooltip from "../../tooltip/Tooltip";

type Props = {
  activateTab: NotesTab;
  onChange: (tab: NotesTab) => void;
};

export default function NotesTabBar({ activateTab, onChange }: Props) {
  const { lang } = useLang();
  const { purchased, uploaded, uploadNewNote, tooltipForDisabled } =
    NOTES_TAB_BAR_TEXTS[lang];

  const isUploadEnabled = activateTab === "uploaded";
  const tooltipText = isUploadEnabled ? uploadNewNote : tooltipForDisabled;

  return (
    <ButtonContainer>
      <SwitchModeButton
        $active={activateTab === "purchased"}
        onClick={() => onChange("purchased")}
      >
        {purchased}
      </SwitchModeButton>
      <SwitchModeButton
        $active={activateTab === "uploaded"}
        onClick={() => onChange("uploaded")}
      >
        {uploaded}
      </SwitchModeButton>

      <Tooltip content={tooltipText}>
        <span>
          <UploadButton $enabled={isUploadEnabled} disabled={!isUploadEnabled}>
            <Plus size={40} />
          </UploadButton>
        </span>
      </Tooltip>
    </ButtonContainer>
  );
}
