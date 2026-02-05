import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
