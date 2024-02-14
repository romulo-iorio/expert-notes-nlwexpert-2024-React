import { Note } from "../interfaces";

export const useFilterAndSortNotes = (notes: Note[], search: string) => {
  const notesFiltered = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return notesFiltered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
