'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/actions'; // звертаємося до actions
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

  const { data: notes } = useQuery<Note[]>({
    queryKey: ['notes', tag, debouncedSearch],
    queryFn: () => fetchNotesByTag(tag),
  });

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
