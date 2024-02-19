import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const TERMS_URL =
  'https://www.onefence.co/terms-and-conditions';

const TermsPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(TERMS_URL);
  }, [router]);

  return <Loading cover="page" />;
};

export default TermsPage;
