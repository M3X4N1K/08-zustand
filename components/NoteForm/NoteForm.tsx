"use client";

import React, { ChangeEvent, FormEvent } from "react";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string; tag: NoteTag }) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const { draft, setDraft } = useNoteStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
        className={css.input}
        required
      />
      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
        className={css.textarea}
      />
      <select name="tag" value={draft.tag} onChange={handleChange} className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit" className={css.button}>
        Create
      </button>
    </form>
  );
}
