"use client";

import React from "react";
import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";

type NoteDetailsProps = {
  note: Note;
};

const NoteDetails: React.FC<NoteDetailsProps> = ({ note }) => {
  if (!note) return null;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}>Tag: {note.tag}</p>
    </div>
  );
};

export default NoteDetails;
