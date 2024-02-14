import { useState } from "react";

import { Note } from "../interfaces";

const getInitialNotesValue = (): Note[] => {
  const notesJSON = localStorage.getItem("@expert-notes/notes");
  if (!notesJSON) return [];

  return JSON.parse(notesJSON) as Note[];
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
