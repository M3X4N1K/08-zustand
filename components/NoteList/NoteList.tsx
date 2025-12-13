import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <div className={css.card}>
              <div className={css.header}>
                <h3 className={css.title}>{note.title}</h3>
                {note.tag && <span className={css.tag}>{note.tag}</span>}
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}