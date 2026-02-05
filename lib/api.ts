import axios from 'axios';
import type { Note } from '@/types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: string;
}

type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
