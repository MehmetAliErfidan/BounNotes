//this is incomplete
import { NOTE_CARD_TEXTS } from "../../i18n/translations/notes/NoteCard";
import { useLang } from "../../i18n";
import type { NoteCardProps } from "./NoteTypes";

export default function NoteDetail({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { seeDetailText } = NOTE_CARD_TEXTS[lang];

  return (
    <div>
      <div>
        <h1>{note.title}</h1>
      </div>

      <div>
        <div>
          <p>{note.course}</p>
          <p>{note.teacher}</p>
          <button>{seeDetailText}</button>
        </div>

        <div>
          <div>
            <img />
            <p>{note.username}</p>
          </div>

          <div>
            // {note.rating} / 5<button></button> //comment icon
          </div>

          <div>
            // pdf preview on this line
            <button></button> //price
          </div>
        </div>
      </div>
    </div>
  );
}
