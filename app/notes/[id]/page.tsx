// app/notes/[id]/page.tsx
import NoteDetails from "@/components/NoteDetails/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type Params = {
  id: string;
};

type PageProps = {
  params: Params;
};

export default async function NotePage({ params }: PageProps) {
  try {
    const note: Note = await fetchNoteById(params.id);

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
