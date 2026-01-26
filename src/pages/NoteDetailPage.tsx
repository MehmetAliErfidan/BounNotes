import { useParams, useNavigate } from "react-router-dom";
import NoteDetailUI from "../components/note/NoteDetailUI";
import { dummyData } from "../data/dummyData";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { notePermissionsFromContext } from "../components/note/notePermissionsFromContext";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = dummyData.find((x) => x.note.id === Number(id));
  if (!item) return <p>Note not found.</p>;

  const { note, context } = item;

  if (!note) return <p>Note not found.</p>;

  const handleBuy = () => {
    navigate(`/note/${note.id}/buy`);
  };

  return (
    <>
      <Navbar />
      <Main>
        <NoteDetailUI
          note={note}
          permissions={notePermissionsFromContext(context)}
          onBuy={handleBuy}
        />
      </Main>
    </>
  );
}
