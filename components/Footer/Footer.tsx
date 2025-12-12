import React from 'react';
import css from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p className={css.text}>
          © 2024 NoteHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};