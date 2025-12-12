import './globals.css';
import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import  Header  from '@/components/Header/Header';
import  Footer  from '@/components/Footer/Footer';

export const metadata = {
  title: 'NoteHub',
  description: 'Your notes app - create, manage, and filter notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'Your notes app - create, manage, and filter notes.',
    url: 'https://your-app-url.vercel.app',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, sidebar, modal }: LayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Header />
        <div style={{ display: 'flex' }}>
          {sidebar && <aside>{sidebar}</aside>}
          <main style={{ flex: 1 }}>{children}</main>
        </div>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
