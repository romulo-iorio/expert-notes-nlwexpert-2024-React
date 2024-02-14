import { X as XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import { useRecording } from "../hooks";

interface Props {
  onNoteCreated: (content: string) => void;
}

export const AddNewNoteCard: React.FC<Props> = ({ onNoteCreated }) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  const { handleStartRecording, handleStopRecording, isRecording } =
    useRecording({ setShouldShowOnboarding, setContent });

  const handleStartTextEditor = () => setShouldShowOnboarding(false);

  const handleNoteContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value: content } = event.target;

    setContent(content);

    if (content === "") return setShouldShowOnboarding(true);
  };

  const handleSaveNote = () => {
    onNoteCreated(content);

    if (content === "") return;

    setContent("");
    setShouldShowOnboarding(true);

    toast.success("Nota criada com sucesso!");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] md:rounded-md w-full bg-slate-700 flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <XIcon className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                    type="button"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartTextEditor}
                    type="button"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none flex-1"
                  onChange={handleNoteContentChange}
                  disabled={isRecording}
                  value={content}
                  autoFocus
                />
              )}
            </div>

            {isRecording ? (
              <button
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-50 focus-visible:text-slate-50 transition-colors"
                onClick={handleStopRecording}
                type="button"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando... Clique para interromper
              </button>
            ) : (
              <button
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 focus-visible:bg-lime-500 transition-colors disabled:bg-lime-500 disabled:text-lime-950 disabled:cursor-not-allowed"
                disabled={content === ""}
                onClick={handleSaveNote}
                type="button"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
