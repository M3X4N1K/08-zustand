import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

export const metadata = {
  title: 'Create note - NoteHub',
  description: 'Створіть нову нотатку у NoteHub',
  openGraph: {
    title: 'Create note - NoteHub',
    description: 'Створіть нову нотатку у NoteHub',
    url: 'https://your-vercel-app.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
