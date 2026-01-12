import { SwitchModeButton, ButtonContainer } from "./!NotesTabBar.styled";
import { NOTES_TAB_BAR_TEXTS } from "../../../i18n/translations/notes/NotesTabBar";
import { useLang } from "../../../i18n";
import type { NotesTab } from "./NotesTabBar.types";

type Props = {
  activateTab: NotesTab;
  onChange: (tab: NotesTab) => void;
};

export default function NotesTabBar({ activateTab, onChange }: Props) {
  const { lang } = useLang();
  const { purchased, uploaded } = NOTES_TAB_BAR_TEXTS[lang];

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
    </ButtonContainer>
  );
}
