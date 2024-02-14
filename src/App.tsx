import { useState } from "react";

import {
  AddNewNoteCard,
  NotesContainer,
  Separator,
  NoteCard,
} from "./components";
import {
  useHandleNotesStorage,
  useFilterAndSortNotes,
  useNotes,
} from "./hooks";
import logo from "./assets/logo-nlw-expert.svg";

export function App() {
  const { notes, onNoteCreated, onNoteRemoved, setNotes } = useNotes();
  useHandleNotesStorage({ notes, setNotes });
  const [search, setSearch] = useState("");

  const filteredAndSortedNotes = useFilterAndSortNotes(notes, search);

  const renderNotes = filteredAndSortedNotes.map((note) => (
    <NoteCard key={note.id} note={note} onNoteRemoved={onNoteRemoved} />
  ));

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          placeholder="Busque em suas notas..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
        />
      </form>

      <Separator />

      <NotesContainer>
        <AddNewNoteCard onNoteCreated={onNoteCreated} />

        {renderNotes}
      </NotesContainer>
    </div>
  );
}
