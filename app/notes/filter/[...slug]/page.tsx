import NotesClient from "@/components/NotesClient/NotesClient";
import { fetchNotesByTag } from "@/lib/api";
import type { Note } from "@/types/note";

export default async function FilteredNotesPage({ params }: any) {
  const { slug } = params;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  try {
    const notes: Note[] = await fetchNotesByTag(tag);

    return <NotesClient notes={notes} currentTag={tag || "all"} />;
  } catch (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Oops! Error loading notes.</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}
