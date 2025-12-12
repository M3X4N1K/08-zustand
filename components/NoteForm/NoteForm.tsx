"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string; tag: NoteTag }) => void;
  onCancel?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel }) => {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag);

  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setTag(draft.tag);
  }, [draft]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
    clearDraft();
  };

  const handleChange = (field: "title" | "content" | "tag", value: string) => {
    if (field === "title") setTitle(value);
    if (field === "content") setContent(value);
    if (field === "tag") setTag(value as NoteTag);
    setDraft({ [field]: value } as any);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </label>
      <label>
        Content
        <textarea
          value={content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </label>
      <label>
        Tag
        <select value={tag} onChange={(e) => handleChange("tag", e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </label>
      <div className={css.actions}>
        <button type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default NoteForm;
