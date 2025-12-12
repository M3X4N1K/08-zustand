"use client";

import React, { FormEvent, useEffect } from "react";
import { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (noteData: { title: string; content: string; tag: NoteTag }) => void;
}

const validTags: NoteTag[] = ["Todo", "Work", "Personal"];

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const { draft, setDraft, clearDraft } = useNoteStore();

  useEffect(() => {
    if (!draft.tag) setDraft({ ...draft, tag: "Todo" });
  }, [draft, setDraft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validTags.includes(draft.tag as NoteTag)) {
      onSubmit(draft as { title: string; content: string; tag: NoteTag });
    } else {
      console.error("Invalid tag value:", draft.tag);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title:
        <input
          className={css.input}
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Content:
        <textarea
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={handleChange}
        />
      </label>

      <label className={css.label}>
        Tag:
        <select
          className={css.select}
          name="tag"
          value={draft.tag}
          onChange={handleChange}
        >
          {validTags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>Save</button>
      </div>
    </form>
  );
};

export default NoteForm;
