"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./page.module.css";
import { NoteTag } from "@/types/note";

const CreateNotePage: React.FC = () => {
  const router = useRouter();
  const { draft, clearDraft } = useNoteStore();

  const handleSubmit = async (noteData: { title: string; content: string; tag: NoteTag }) => {
    try {
      await createNote(noteData);
      clearDraft();
      router.push("/notes/filter/all");
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default CreateNotePage;
