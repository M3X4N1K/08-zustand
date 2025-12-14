'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/actions';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createNote(draft);
      clearDraft();
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Content
        <textarea
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          className={css.textarea}
        />
      </label>
      <label className={css.label}>
        Tag
        <select
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <div className={css.actions}>
        <button type="button" className={css.cancel} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submit}>
          Create
        </button>
      </div>
    </form>
  );
}
