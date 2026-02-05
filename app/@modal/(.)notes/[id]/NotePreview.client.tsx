'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
