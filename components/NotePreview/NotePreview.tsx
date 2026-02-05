'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import Loader from '@/components/Loader/Loader';

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    staleTime: 30_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) return <Loader />;
  if (error || !data) return <p>Error</p>;
  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>
            Back
          </button>

          <div className={css.header}>
            <h2>{data.title}</h2>
            <span className={css.tag}>{data.tag}</span>
          </div>

          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>

          {isFetching ? <p>Updating…</p> : null}
        </div>
      </div>
    </>
  );
}
