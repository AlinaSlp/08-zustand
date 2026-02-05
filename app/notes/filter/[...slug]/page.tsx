import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';
  const pretty = filter === 'all' ? 'All notes' : `Tag: ${filter}`;
  const title = `NoteHub — ${pretty}`;
  const description =
    filter === 'all'
      ? 'Browse all notes in NoteHub.'
      : `Browse notes tagged ${filter}.`;
  return {
    title: title,
    description: description.slice(0, 160),
    openGraph: {
      title: title,
      description: description.slice(0, 160),
      url: `https://08-zustand-dgzirgrbj-alinas-projects-b7b7e1d5.vercel.app/${filter}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
  };
}

const PER_PAGE = 12;

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const filter = slug?.[0] ?? 'all';
  const tag = filter === 'all' ? undefined : filter;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes', tag, 1, '', PER_PAGE],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
