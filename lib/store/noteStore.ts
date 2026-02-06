import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, updatedFields: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useNoteStore = create<NoteStore>(set => ({
  notes: [],
  addNote: note => set(state => ({ notes: [...state.notes, note] })),
  updateNote: (id, updatedFields) =>
    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updatedFields } : note
      ),
    })),
  deleteNote: id =>
    set(state => ({ notes: state.notes.filter(note => note.id !== id) })),
}));
