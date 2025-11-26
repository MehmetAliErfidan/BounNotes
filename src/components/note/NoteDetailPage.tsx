//this is incomplete

import type { NoteCardProps } from "./NoteTypes";
import { NOTE_DETAIL_TEXTS } from "../../i18n/translations/notes/NoteDetail";
import { useLang } from "../../i18n";

export default function NoteDetail({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { buyText } = NOTE_DETAIL_TEXTS[lang];

  return (
    <div>
      <div>
        <h1>{note.title}</h1>
      </div>

      <div>
        <div>
          <p>{note.course}</p>
          <p>{note.teacher}</p>
        </div>
        <div>
          <p>{note.date}</p>
          <p>{note.description}</p>
        </div>

        <div>
          <div>
            <img />
            <p>{note.username}</p>
          </div>

          <div>
            // five stars on this line
            <button></button> //comment icon
          </div>

          <div>
            // pdf preview on this line
            <button>{note.price}</button>
            <button>{buyText}</button> //buy button
          </div>
        </div>
      </div>
    </div>
  );
}
