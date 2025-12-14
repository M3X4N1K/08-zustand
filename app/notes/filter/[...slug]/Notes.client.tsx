'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchNotesByTag } from '@/lib/actions';
import { Note } from '@/types/note';
import { useDebounce } from '@/lib/hooks/useDebounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from './Notes.client.module.css';

interface NotesClientProps {
  tag: string;
}

const PER_PAGE = 6;

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotesByTag(tag, page, PER_PAGE, debouncedSearch),
    placeholderData: {
      notes: [],
      totalPages: 1,
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load notes</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <SearchBox value={search} onChange={setSearch} />

        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />

          {data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onChange={setPage}
            />
          )}
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
