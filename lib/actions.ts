// lib/actions.ts
import { api } from './api';
import { Note } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotesByTag = async (
  tag: string,
  page = 1,
  perPage = 6,
  search = ''
): Promise<NotesResponse> => {
  const params = new URLSearchParams();

  if (tag && tag !== 'all') params.append('tag', tag);
  params.append('page', String(page));
  params.append('perPage', String(perPage));
  if (search) params.append('search', search);

  const { data } = await api.get<NotesResponse>(`/notes?${params.toString()}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
};
