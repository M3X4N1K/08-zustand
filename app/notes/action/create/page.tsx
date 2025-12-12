"use client";

import React from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

export const metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note in NoteHub application.",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub application.",
    url: "https://your-vercel-domain.vercel.app/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;
