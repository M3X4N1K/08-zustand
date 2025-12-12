import React from "react";
import css from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <p className={css.text}>© 2025 NoteHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
