//this is incomplete
import { useNavigate } from "react-router-dom";
import { NOTE_CARD_TEXTS } from "../../i18n/translations/notes/NoteCard";
import { useLang } from "../../i18n";
import type { NoteCardProps } from "./NoteTypes";

export default function NoteCard({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { seeDetailText } = NOTE_CARD_TEXTS[lang];
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md w-full h-full flex flex-col justify-between">
      {/* Title */}
      <div className="mb-2 border-b border-blue-200 pb-2">
        <h2 className="font-semibold text-base line-clamp-2">{note.title}</h2>
      </div>

      {/* Course & Teacher */}
      <div className="text-sm text-gray-700 mb-3">
        <p className="font-medium">{note.course}</p>
        <p className="text-gray-500">{note.teacher}</p>
      </div>

      {/* User + Rating + Price */}
      <div className="mt-auto flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          {/* Profile picture will come later, let's leave a placeholder */}
          <div className="w-8 h-8 rounded-full bg-blue-200" />
          <p className="text-gray-700">{note.username}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-medium">{note.rating} / 5</span>
          <span className="font-semibold">{note.price}</span>
        </div>

        {/* Detail button */}
        <button
          onClick={handleSeeDetail}
          className="mt-2 w-full text-center text-sm font-medium bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700 transition"
        >
          {seeDetailText}
        </button>
      </div>
    </div>
  );
}
