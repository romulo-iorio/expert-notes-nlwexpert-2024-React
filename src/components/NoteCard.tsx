import { formatDistanceToNow } from "date-fns";
import { X as XIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  note: {
    date: Date;
    content: string;
  };
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const NoteCard: React.FC<Props> = ({ note: { date, content } }) => {
  const dateString = capitalize(
    formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">{dateString}</span>
        <p className="text-sm leading-6 text-slate-400">{content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <XIcon className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {dateString}
            </span>
            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>

          <button
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            type="button"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota?
            </span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
