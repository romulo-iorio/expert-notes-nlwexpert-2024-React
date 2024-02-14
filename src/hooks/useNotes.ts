import { useState } from "react";

import { Note } from "../interfaces";

const getInitialNotesValue = () => {
  const notesJSON = localStorage.getItem("@expert-notes/notes");
  return notesJSON ? (JSON.parse(notesJSON) as Note[]) : [];
};

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(getInitialNotesValue);

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

  return { notes, onNoteCreated, onNoteRemoved, setNotes };
};
