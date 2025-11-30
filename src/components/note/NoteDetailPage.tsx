//this is incomplete
import { Star } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import type { NoteCardProps } from "./NoteTypes";
import { NOTE_DETAIL_TEXTS } from "../../i18n/translations/notes/NoteDetail";
import { useLang } from "../../i18n";

export default function NoteDetail({ note }: NoteCardProps) {
  const { lang } = useLang();
  const { buyText } = NOTE_DETAIL_TEXTS[lang];

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md max-w-3xl mx-auto w-full">
      <div className="text-center m-auto p-2 border-b-2 border-amber-300">
        <h1>{note.title}</h1>
      </div>

      <div className="m-auto p-1 border-b-2 border-amber-300">
        <div className="m-auto p-1 border-4 border-amber-200">
          <p>{note.course}</p>
          <p>{note.teacher}</p>
        </div>

        <div className="m-auto p-1 border-4 border-amber-200">
          <p className="text-left p-1 text-gray-400 border-b-2 border-amber-200">
            {note.date}
          </p>
          <p className="p-1">{note.description}</p>
        </div>
      </div>

      <div className="m-auto p-2 flex flex-row gap-4 sm:flex-col sm:items-center">
        <div>
          <img />
          <p>{note.username}</p>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                fill={index < note.rating ? "currentColor" : "none"}
                className={
                  index < note.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
            <button>
              <MessageSquareText className="bg-pink-600" size={18} />
            </button>{" "}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          // pdf preview on this line
          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto md:w-auto lg:w-auto">
            <button>{note.price}</button>
            <button>{buyText}</button> //buy button
          </div>
        </div>
      </div>
    </div>
  );
}
