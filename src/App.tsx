import {
  AddNewNoteCard,
  NotesContainer,
  Separator,
  NoteCard,
} from "./components";
import logo from "./assets/logo-nlw-expert.svg";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          placeholder="Busque em suas notas..."
          type="text"
        />
      </form>

      <Separator />

      <NotesContainer>
        <AddNewNoteCard />

        <NoteCard note={{ date: new Date(), content: "Hello world" }} />

        <NoteCard note={{ date: new Date(2023, 4, 1), content: "Teste" }} />
      </NotesContainer>
    </div>
  );
}
