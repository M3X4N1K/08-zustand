"use client";
import React from 'react';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface Props {
  note: Note;
  onClose: () => void;
}

export default function NotePreview({ note, onClose }: Props) {
  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>X</button>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
      </div>
    </div>
  );
}
