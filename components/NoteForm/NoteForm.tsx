"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";

const availableTags: NoteTag[] = ["Todo", "Work", "Personal"];

interface NoteFormProps {
  onCreated?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onCreated }) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createNote({ title, content, tag });
      clearDraft();
      if (onCreated) onCreated();
      router.push("/notes/filter/all");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title:
        <input
          className={css.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className={css.label}>
        Content:
        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label className={css.label}>
        Tag:
        <select
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
        >
          {availableTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={css.buttons}>
        <button type="submit" className={css.submit}>
          Save
        </button>
        <button
          type="button"
          className={css.cancel}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
