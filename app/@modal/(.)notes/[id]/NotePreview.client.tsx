"use client";

import React from "react";
import type { Note } from "@/types/note";

interface Props {
  note: Note;
  onClose: () => void;
}

export default function NotePreview({ note, onClose }: Props) {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </div>
  );
}
