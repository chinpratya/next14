import Link from 'next/link';

import { APP_NAME } from '@/config/constants';

export const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
        <span className="font-weight-semibold">{`${APP_NAME}`}</span>{' '}
        All rights reserved.
      </span>
      <div>
        <Link
          className="text-gray"
          href="/terms"
          onClick={(e) => e.preventDefault()}
        >
          Term & Conditions
        </Link>
        <span className="mx-2 text-muted"> | </span>
        <Link
          className="text-gray"
          href="/privacy-policy"
          onClick={(e) => e.preventDefault()}
        >
          Privacy & Policy
        </Link>
      </div>
    </footer>
  );
};
