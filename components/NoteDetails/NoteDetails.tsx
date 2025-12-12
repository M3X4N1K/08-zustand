
import React from "react";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type NoteDetailsProps = {
  note: Note;
};

const NoteDetails: React.FC<NoteDetailsProps> = ({ note }) => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <p className={css.tag}>Tag: {note.tag}</p>
    </div>
  );
};

export default NoteDetails;
