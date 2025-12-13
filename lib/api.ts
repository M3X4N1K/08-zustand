import { Note } from '@/types/note';
import { fetchNotesAction, fetchNoteByIdAction, createNoteAction } from './actions';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise {
  return fetchNotesAction(params);
}

export async function fetchNoteById(id: string): Promise {
  return fetchNoteByIdAction(id);
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(data: CreateNoteData): Promise {
  return createNoteAction(data);
}