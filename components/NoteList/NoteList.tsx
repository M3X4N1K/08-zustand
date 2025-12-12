"use client";

import React from "react";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onSelect?: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelect }) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item} onClick={() => onSelect?.(note)}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
