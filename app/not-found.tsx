import css from "./not-found.module.css";

export const metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "The page you are looking for does not exist.",
    url: "https://your-vercel-app.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
