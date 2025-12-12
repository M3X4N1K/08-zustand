import NoteDetails from "@/components/NoteDetails/NoteDetails";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import type { Note } from "@/types/note";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const note: Note | null = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: "Note not found",
      description: "The requested note does not exist.",
      openGraph: {
        title: "Note not found",
        description: "The requested note does not exist.",
        url: `https://your-vercel-app.vercel.app/notes/${params.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  }

  return {
    title: note.title,
    description: note.content.slice(0, 160),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160),
      url: `https://your-vercel-app.vercel.app/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return <p>Note not found</p>;
  }

  return <NoteDetails note={note} />;
}
