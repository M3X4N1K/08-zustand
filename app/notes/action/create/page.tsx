"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";

export default function CreateNotePage() {
  const router = useRouter();
  const { draft, clearDraft } = useNoteStore();

  const handleSubmit = async (note: { title: string; content: string; tag: NoteTag }) => {
    await createNote(note); // note.tag типізовано як NoteTag
    clearDraft();
    router.push("/notes/filter/all");
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
