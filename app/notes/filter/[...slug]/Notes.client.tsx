"use client";
import React from "react";
import type { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";

interface Props {
  notes: Note[];
}

export default function NotesClient({ notes }: Props) {
  return <NoteList notes={notes} />;
}
