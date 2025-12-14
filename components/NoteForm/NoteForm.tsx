'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/actions';
import { useNoteStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ title: e.target.value })}
        placeholder="Title"
        required
      />

      <textarea
        value={draft.content}
        onChange={(e) => setDraft({ content: e.target.value })}
        placeholder="Content"
        required
      />

      <select
        value={draft.tag}
        onChange={(e) => setDraft({ tag: e.target.value })}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Create'}
      </button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}
