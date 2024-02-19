import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const CyberFencePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/apps?ref=cyberfence');
  }, [router]);

  return <Loading cover="page" />;
};
export default CyberFencePage;
