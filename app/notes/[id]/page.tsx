// app/notes/[id]/page.tsx
import NoteDetails from "@/components/NoteDetails/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

// Не типізуємо params вручну, щоб уникнути конфлікту з Next.js PageProps
export default async function NotePage({ params }: any) {
  const { id } = params;

  try {
    const note: Note = await fetchNoteById(id);

    return <NoteDetails note={note} />;
  } catch (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Oops! Failed to load note.</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
