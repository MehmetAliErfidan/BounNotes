//this is incomplete

import type { NoteCardProps } from "./NoteTypes";

export default function NoteDetail({ note }: NoteCardProps) {
  return (
    <div>
      <div>
        <h1>{note.title}</h1>
      </div>

      <div>
        <div>
          <p>{note.course}</p>
          <p>{note.teacher}</p>
          <button>Detay Gör</button>
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
