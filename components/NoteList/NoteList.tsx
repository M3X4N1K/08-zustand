import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.noteList}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteItem}>
          <Link href={`/notes/${note.id}`} className={css.noteLink}>
            <div className={css.noteHeader}>
              <h3 className={css.noteTitle}>{note.title}</h3>
              {note.tag && <span className={css.noteTag}>{note.tag}</span>}
            </div>
            <p className={css.noteContent}>
              {note.content.length > 100
                ? `${note.content.substring(0, 100)}...`
                : note.content}
            </p>
            <p className={css.noteDate}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}