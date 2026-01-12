import { useState } from "react";
import Navbar from "../components/common/navbar/Navbar";
import NotesTabBar from "../components/note/my-notes/NotesTabBar";
import { NotesTabBarContainer } from "./!MyNotesPage.styled";
import { Main } from "../styles/GlobalStyles";
import type { NotesTab } from "../components/note/my-notes/NotesTabBar.types";

export default function MyNotesPage() {
  const [activeTab, setActiveTab] = useState<NotesTab>("purchased");

  return (
    <Main>
      <Navbar />
      <NotesTabBarContainer>
        <NotesTabBar
          activateTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      </NotesTabBarContainer>
    </Main>
  );
}
