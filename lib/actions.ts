'use server';

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

export async function fetchNotesAction(
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

  try {
    console.log('🔵 Server Action: Fetching notes');
    const response = await fetch(`${API_BASE_URL}/notes?${urlParams}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Server Action: API error', response.status);
      throw new Error('Failed to fetch notes');
    }

    const data: FetchNotesResponse = await response.json();
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

    const data: Note = await response.json();
    console.log('✅ Server Action: Note fetched', data.title);
    return data;
  } catch (error) {
    console.error('❌ Server Action Error:', error);
    throw error;
  }
}

export interface CreateNoteData {
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

    const result: Note = await response.json();
    console.log('✅ Server Action: Note created', result.id);
    return result;
  } catch (error) {
    console.error('❌ Server Action Error:', error);
    throw error;
  }
}