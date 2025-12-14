// lib/actions.ts
import { api } from './api';
import { Note } from '@/types/note';

/**
 * Fetch all notes
 */
export const fetchNotes = async (): Promise<Note[]> => {
  const response = await api.get<Note[]>('/notes');
  return response.data;
};

/**
 * Fetch single note by ID
 */
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

/**
 * Create a new note
 */
export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

/**
 * Fetch notes filtered by tag
 */
export const fetchNotesByTag = async (tag: string): Promise<Note[]> => {
  try {
    const query = tag && tag !== 'all' ? `?tag=${tag}` : '';
    const { data } = await api.get<Note[]>(`/notes${query}`);
    return data;
  } catch (error) {
    console.error('Error fetching notes by tag:', error);
    return [] as Note[];
  }
};
