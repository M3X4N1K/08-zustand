"use client";

import React from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

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
