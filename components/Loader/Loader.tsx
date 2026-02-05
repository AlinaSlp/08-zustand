import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

interface LoaderProps {
  variant?: 'page' | 'overlay';
}

export default function Loader({ variant = 'page' }: LoaderProps) {
  return (
    <div className={variant === 'overlay' ? css.overlay : css.page}>
      <Oval
        height={48}
        width={48}
        color="#0d6efd"
        secondaryColor="#e7f1ff"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
}
