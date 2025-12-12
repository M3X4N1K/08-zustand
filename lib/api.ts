import { Note } from "@/types/note";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");

  const data = await res.json();

  return data.map((note: any) => ({
    id: note.id,
    title: note.title,
    body: note.body,
  }));
}
