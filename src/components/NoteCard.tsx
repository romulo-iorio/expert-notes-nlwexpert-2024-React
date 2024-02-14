import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { NoteDialog } from "./NoteDialog";
import { Note } from "../interfaces";

interface Props {
  onNoteRemoved: (id: string) => void;
  note: Note;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const NoteCard: React.FC<Props> = ({
  note: { date, content, id },
  onNoteRemoved,
}) => {
  const dateString = capitalize(
    formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
  );

  return (
    <NoteDialog
      triggerClassName="bg-slate-800 relative"
      Trigger={
        <>
          <span className="text-sm font-medium text-slate-300">
            {dateString}
          </span>
          <p className="text-sm leading-6 text-slate-400">{content}</p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </>
      }
      Content={
        <>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {dateString}
            </span>
            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>

          <button
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:bg-slate-900 focus-visible:bg-slate-900 group"
            onClick={() => onNoteRemoved(id)}
            type="button"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline group-focus-visible:underline">
              apagar essa nota?
            </span>
          </button>
        </>
      }
    />
  );
};
