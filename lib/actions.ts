'use server';

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

export async function fetchNotesAction({
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

  try {
    console.log('🔵 Server Action: Fetching notes');
    const response = await fetch(`${API_BASE_URL}/notes?${params}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Server Action: API error', response.status);
      throw new Error('Failed to fetch notes');
    }

    const data = await response.json();
    console.log('✅ Server Action: Notes fetched', data.notes?.length || 0);
    return data;
  } catch (error) {
    console.error('❌ Server Action Error:', error);
    throw error;
  }
}

export async function fetchNoteByIdAction(id: string): Promise<Note> {
  try {
    console.log('🔵 Server Action: Fetching note', id);
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Server Action: API error', response.status);
      throw new Error('Failed to fetch note');
    }

    const data = await response.json();
    console.log('✅ Server Action: Note fetched', data.title);
    return data;
  } catch (error) {
    console.error('❌ Server Action Error:', error);
    throw error;
  }
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export async function createNoteAction(data: CreateNoteData): Promise<Note> {
  try {
    console.log('🔵 Server Action: Creating note', data.title);
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('❌ Server Action: API error', response.status);
      throw new Error('Failed to create note');
    }

    const result = await response.json();
    console.log('✅ Server Action: Note created', result.id);
    return result;
  } catch (error) {
    console.error('❌ Server Action Error:', error);
    throw error;
  }
}