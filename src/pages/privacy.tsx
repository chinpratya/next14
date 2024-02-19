import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const PRIVACY_URL =
  'https://www.onefence.co/%E0%B8%99%E0%B9%82%E0%B8%A2%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%95%E0%B8%B1%E0%B8%A7/';

const PrivacyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(PRIVACY_URL);
  }, [router]);

  return <Loading cover="page" />;
};

export default PrivacyPage;
