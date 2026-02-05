import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { HydrationBoundary } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description:
      note.content?.trim().length === 0
        ? 'View note details in NoteHub.'
        : note.content.slice(0, 160),
    openGraph: {
      title: `Note: ${note.title}`,
      description:
        note.content?.trim().length === 0
          ? 'View note details in NoteHub.'
          : note.content.slice(0, 160),
      url: `https://08-zustand-dgzirgrbj-alinas-projects-b7b7e1d5.vercel.app/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
