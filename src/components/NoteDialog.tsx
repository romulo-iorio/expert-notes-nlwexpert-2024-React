import { X as XIcon } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  triggerClassName?: string;
  Trigger: React.ReactNode;
  Content: React.ReactNode;
}

export const NoteDialog: React.FC<Props> = ({
  triggerClassName,
  Trigger,
  Content,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`rounded-md text-left flex flex-col p-5 gap-3 outline-none overflow-hidden hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ${triggerClassName}`}
      >
        {Trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] md:rounded-md w-full bg-slate-700 flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <XIcon className="size-5" />
          </Dialog.Close>

          {Content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
