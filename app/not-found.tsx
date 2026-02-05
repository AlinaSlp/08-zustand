import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'https://08-zustand-dgzirgrbj-alinas-projects-b7b7e1d5.vercel.app/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
