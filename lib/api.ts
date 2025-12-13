import { Note } from '@/types/note';

const API_BASE_URL = 'https://ac.goit.global/api/v1';
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
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search) {
    params.append('search', search);
  }

  if (tag) {
    params.append('tag', tag);
  }

  const response = await fetch(`${API_BASE_URL}/notes?${params}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate: 60 },
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
    next: { revalidate: 60 },
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