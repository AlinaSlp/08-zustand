import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export type DraftNote = {
  title: string;
  content: string;
  tag: string;
};

type NoteStore = {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,

      setDraft: note =>
        set({
          draft: {
            ...get().draft,
            ...note,
          },
        }),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft', // localStorage key
    }
  )
);
