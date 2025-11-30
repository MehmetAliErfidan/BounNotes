//this is incomplete
import { NOTE_CARD_TEXTS } from "../../i18n/translations/notes/NoteCard";
import { useLang } from "../../i18n";
import type { NoteCardProps } from "./NoteTypes";

export default function NoteDetail({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { seeDetailText } = NOTE_CARD_TEXTS[lang];

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md max-w-3xl mx-auto w-full">
      <div className="text-center m-auto p-2 border-b-2 border-blue-300">
        <h1>{note.title}</h1>
      </div>

      <div>
        <div className="m-auto p-1 border-4 border-blue-200">
          <p>{note.course}</p>
          <p>{note.teacher}</p>
          <button>{seeDetailText}</button>
        </div>

        <div className="m-auto p-2 flex gap-4 flex-col sm:items-center">
          <div>
            <img />
            <p>{note.username}</p>
          </div>

          <div>{note.rating} / 5</div>

          <div className="flex flex-col gap-2 w-full max-w-xs">
            {/* pdf preview on this line*/}
            <button>{note.price}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
