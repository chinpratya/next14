import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, [router]);

  return <Loading cover="page" />;
};

export default AuthPage;
