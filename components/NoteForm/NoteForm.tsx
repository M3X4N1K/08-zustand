"use client";
import React, { FormEvent } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value } as Partial<{ title: string; content: string; tag: NoteTag }>);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNote(draft);
      clearDraft();
      router.push("/notes/filter/all");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Title
        <input name="title" value={draft.title} onChange={handleChange} required />
      </label>
      <label>
        Content
        <textarea name="content" value={draft.content} onChange={handleChange} />
      </label>
      <label>
        Tag
        <select name="tag" value={draft.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </label>
      <div className={css.buttons}>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
