"use client";

import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  currentTag: string; // додано
}

export default function NoteList({ notes, currentTag }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
}
