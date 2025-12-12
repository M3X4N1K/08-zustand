'use client';

import { useEffect, useRef } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={css.modal}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className={css.modalContent}>
        <button onClick={onClose} className={css.closeButton}>
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
}