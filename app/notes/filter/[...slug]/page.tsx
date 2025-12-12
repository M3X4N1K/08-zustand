import React from "react";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface Props {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: Props) {
  const tag = params.slug[0] ?? "all";
  const title = tag === "all" ? "All Notes - NoteHub" : `${tag} Notes - NoteHub`;
  const description =
    tag === "all"
      ? "Viewing all notes"
      : `Viewing notes filtered by tag: ${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand.vercel.app/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const tag = params.slug[0] === "all" ? undefined : params.slug[0];
  const data = await fetchNotes({ tag });
  return <NotesClient notes={data.notes} />;
}
