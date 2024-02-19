import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
  LoginFlow,
  useRefreshToken,
} from '@/features/auth';
import { useAuth } from '@/stores/auth';
import { Loading } from '@components/loading';
import AuthLayout from '@layouts/AuthLayout';
import { Seo } from '@utilComponents/seo';

const LoginPage = () => {
  const router = useRouter();

  const { authenticate } = useAuth();

  const token = router.query.token as string;

  const refreshToken = useRefreshToken({
    onSuccess: (authenticateUser) => {
      authenticate({
        ...authenticateUser,
        role: undefined,
        access_role: 'apps',
      });
      router.replace(`/apps`, undefined, {
        shallow: true,
      });
    },
    onError: () => {
      router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (token) {
      refreshToken.submit(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (token) {
    return <Loading cover="page" />;
  }

  return (
    <>
      <Seo />
      <LoginFlow />
    </>
  );
};

LoginPage.getLayout = function getLayout(
  page: React.ReactNode
) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
