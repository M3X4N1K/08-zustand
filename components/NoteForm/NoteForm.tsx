"use client";

import { useState } from "react";
import { addNote } from "@/lib/store/noteStore";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNote({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
