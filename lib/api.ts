import { Note } from '@/types/note';
import { 
  fetchNotesAction, 
  fetchNoteByIdAction, 
  createNoteAction,
  FetchNotesParams,
  FetchNotesResponse,
  CreateNoteData
} from './actions';

export type { FetchNotesParams, FetchNotesResponse, CreateNoteData };

export function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  return fetchNotesAction(params);
}

export function fetchNoteById(id: string): Promise<Note> {
  return fetchNoteByIdAction(id);
}

export function createNote(data: CreateNoteData): Promise<Note> {
  return createNoteAction(data);
}