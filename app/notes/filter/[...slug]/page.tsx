import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

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
