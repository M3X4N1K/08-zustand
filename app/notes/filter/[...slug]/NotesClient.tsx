'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/actions';
import { useState } from 'react';
import { NoteList } from './NoteList';
import Link from 'next/link';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Note } from '@/types/note';
import css from './NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', tag, debouncedSearch],
    queryFn: async () => {
      try {
        const notes = await fetchNotesByTag(tag);
        // Завжди повертаємо масив
        return Array.isArray(notes) ? notes : notes?.data ?? [];
      } catch (err) {
        console.error('Fetch notes error:', err);
        return [];
      }
    },
  });

  if (isError) return <p>Error loading notes: {(error as Error).message}</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className={css.search}
        />
        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList notes={Array.isArray(data) ? data : []} />
      )}
    </div>
  );
}
