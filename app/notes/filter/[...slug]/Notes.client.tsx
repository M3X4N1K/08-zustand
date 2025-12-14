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

const NOTES_PER_PAGE = 6;

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ['notes', tag, debouncedSearch],
    queryFn: () => fetchNotesByTag(tag),
    placeholderData: [],
  });

  // локальна пагінація (як вимагає ДЗ)
  const startIndex = (page - 1) * NOTES_PER_PAGE;
  const paginatedNotes = notes.slice(
    startIndex,
    startIndex + NOTES_PER_PAGE
  );

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <SearchBox value={search} onChange={setSearch} />

        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load notes</p>}

      {!isLoading && paginatedNotes.length > 0 && (
        <>
          <NoteList notes={paginatedNotes} />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </>
      )}

      {!isLoading && notes.length === 0 && (
        <p>No notes found</p>
      )}
    </div>
  );
}
