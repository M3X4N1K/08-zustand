import { api } from './api';
import { Note } from '@/types/note';

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await api.get('/notes');
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const fetchNotesByTag = async (tag: string): Promise<Note[]> => {
  const response = await api.get(`/notes/filter/${tag}`);
  return response.data;
};
