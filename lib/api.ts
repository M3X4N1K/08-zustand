import axios from "axios";
import type { Note, NoteTag, CreateNotePayload } from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const fetchNotesByTag = async (tag?: NoteTag): Promise<Note[]> => {
  const url = tag ? `${BASE_URL}/notes?tag=${tag}` : `${BASE_URL}/notes`;
  const { data } = await axios.get<Note[]>(url);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`${BASE_URL}/notes/${id}`);
  return data;
};

export const createNote = async (payload: CreateNotePayload) => {
  const { data } = await axios.post(`${BASE_URL}/notes`, payload);
  return data;
};
