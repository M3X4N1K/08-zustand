import React from "react";
import NoteDetails from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);
  return {
    title: note.title,
    description: note.content ?? "",
    openGraph: {
      title: note.title,
      description: note.content ?? "",
      url: `https://08-zustand.vercel.app/notes/${params.id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);
  return <NoteDetails note={note} />;
}
