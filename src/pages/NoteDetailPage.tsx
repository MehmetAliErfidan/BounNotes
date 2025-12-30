import { useParams, useNavigate } from "react-router-dom";
import NoteDetailUI from "../components/note/NoteDetailUI";
import { dummyData } from "../data/dummyData";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const note = dummyData.find((n) => n.id === Number(id));

  if (!note) return <p>Note not found.</p>;

  const handleBuy = () => {
    navigate(`/note/${note.id}/buy`);
  };

  return <NoteDetailUI note={note} onBuy={handleBuy} />;
}
