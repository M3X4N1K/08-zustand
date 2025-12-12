"use client";
import React from 'react';
import type { Note } from '@/types/note';

interface Props {
  note: Note;
}

export default function NoteDetails({ note }: Props) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </div>
  );
}
