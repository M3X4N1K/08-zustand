'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/actions';
import { useState } from 'react';
import { NoteList } from './NoteList';
import Link from 'next/link';
import { useDebounce } from '@/lib/hooks/useDebounce';
import css from './NotesClient.module.css';

export default function NotesClient({ tag }: { tag: string }) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: notes } = useQuery(['notes', tag, debouncedSearch], () =>
    fetchNotesByTag(tag)
  );

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
      {notes && <NoteList notes={notes} />}
    </div>
  );
}
