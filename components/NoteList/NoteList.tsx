"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import { Note } from "@/types/note";
import styles from "./NoteList.module.css";

export default function NoteList() {
  const notes = useNoteStore((state) => state.notes);

  return (
    <div className={styles.list}>
      {notes.map((note: Note) => (
        <div className={styles.item} key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
}
