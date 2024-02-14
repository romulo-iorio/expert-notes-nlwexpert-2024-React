import { useEffect } from "react";

import { Note } from "../interfaces";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  notes: Note[];
}

export const useHandleNotesStorage = ({ notes, setNotes }: Props) => {
  useEffect(() => {
    const nodesJSON = JSON.stringify(notes);
    localStorage.setItem("@expert-notes/notes", nodesJSON);
  }, [notes]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const isNotesKey = e.key === "@expert-notes/notes";
      if (!isNotesKey) return;

      const notes = JSON.parse(e.newValue || "[]") as Note[];
      setNotes(notes);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
};
