"use client";

import { useState, useEffect } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote({ title, content, tag });
      clearDraft();
      alert("Note created successfully!");
    } catch (error) {
      alert("Failed to create note.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={css.input}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={css.textarea}
        required
      />
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value as NoteTag)}
        className={css.select}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <div className={css.buttons}>
        <button type="submit" className={css.submitBtn}>
          Create
        </button>
      </div>
    </form>
  );
}
