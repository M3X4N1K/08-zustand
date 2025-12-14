import { Note } from '@/types/note';
import css from './NoteList.module.css';

export function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
}
