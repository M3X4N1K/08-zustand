"use client";

import React from "react";
import type { Note } from "@/types/note";

interface Props {
  note: Note;
}

export default function NoteDetailsClient({ note }: Props) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </div>
  );
}
