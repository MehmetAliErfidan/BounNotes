import { useParams } from "react-router-dom";
import NoteDetail from "../components/note/NoteDetail";
import { dummyData } from "../data/dummyData"; // Bu dosyayı az sonra yapacağız

export default function NoteDetailPage() {
  const { id } = useParams();

  const note = dummyData.find((n) => n.id === Number(id));

  if (!note) return <p>Note not found.</p>;

  return <NoteDetail note={note} />;
}
