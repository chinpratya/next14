import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ConfigPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(router.asPath + '/smtp');
  }, [router]);

  return null;
};

export default ConfigPage;
