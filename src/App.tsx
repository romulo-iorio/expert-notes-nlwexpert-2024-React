import { useState } from "react";

import {
  AddNewNoteCard,
  NotesContainer,
  Separator,
  NoteCard,
} from "./components";
import { Note } from "./interfaces";
import logo from "./assets/logo-nlw-expert.svg";

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const onNoteCreated = (content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const onNoteRemoved = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const notesSortedByDate = notes.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const renderNotes = notesSortedByDate.map((note) => (
    <NoteCard key={note.id} note={note} onNoteRemoved={onNoteRemoved} />
  ));

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
        <AddNewNoteCard onNoteCreated={onNoteCreated} />

        {renderNotes}
      </NotesContainer>
    </div>
  );
}
