import { Note } from '@/types/note';

const BASE_URL = 'https://api.notehub.dev.goit.global/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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
  totalNotes: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search) {
    params.append('search', search);
  }

  if (tag) {
    params.append('tag', tag);
  }

  const response = await fetch(`${BASE_URL}/notes?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  return response.json();
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }

  return response.json();
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
}