"use client";

import NoteList from "../NoteList/NoteList";
import type { Note } from "@/types/note";

interface NotesClientProps {
  notes: Note[];
  currentTag: string;
}

export default function NotesClient({ notes, currentTag }: NotesClientProps) {
  return <NoteList notes={notes} currentTag={currentTag} />;
}
