import { Note } from '@/types/note';

const API_BASE_URL = 'https://ac.goit.global/api/v1';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;
  
  const urlParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search) {
    urlParams.append('search', search);
  }

  if (tag) {
    urlParams.append('tag', tag);
  }

  const response = await fetch(`${API_BASE_URL}/notes?${urlParams}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  return response.json();
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }

  return response.json();
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
}