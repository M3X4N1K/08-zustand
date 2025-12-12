import React from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub",
    url: "https://08-zustand.vercel.app/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  const router = useRouter();

  const handleSubmit = async (note: { title: string; content: string; tag: string }) => {
    await createNote(note);
    router.push("/notes/filter/all");
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleSubmit} onCancel={() => router.back()} />
      </div>
    </main>
  );
}
