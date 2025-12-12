"use client";
import React from "react";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a href={tag === "All" ? "/notes/filter/all" : `/notes/filter/${tag}`} className={css.menuLink}>
            {tag} notes
          </a>
        </li>
      ))}
    </ul>
  );
}
