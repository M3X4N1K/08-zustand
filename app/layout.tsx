import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// SEO metadata
export const metadata = {
  title: "NoteHub - Your Notes App",
  description: "Create, manage, and filter your notes with NoteHub.",
  openGraph: {
    title: "NoteHub - Your Notes App",
    description: "Create, manage, and filter your notes with NoteHub.",
    url: "https://your-vercel-app.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode; // тепер обов’язково, як в Next.js
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
