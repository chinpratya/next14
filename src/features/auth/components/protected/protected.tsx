import { ReactElement, useEffect, useState } from 'react';

import { useAuth } from '@/stores/auth';
import { Loading } from '@components/loading';

import { useRefreshToken } from '../../api/refresh-token';

type ProtectedProps = {
  accessRole?: string;
  children: ReactElement;
};

export const Protected = ({
  accessRole = 'apps',
  children,
}: ProtectedProps) => {
  const {
    access_token,
    access_role,
    refresh_token,
    expiresIn,
    authenticate,
    logout,
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const refreshToken = useRefreshToken({
    onSuccess: authenticate,
  });

  useEffect(() => {
    const isRefreshTokenExpired = expiresIn < Date.now();
    if (
      refresh_token &&
      accessRole === 'apps' &&
      isRefreshTokenExpired &&
      !refreshToken.isLoading
    ) {
      refreshToken.submit(refresh_token);
    }
  }, [
    refresh_token,
    accessRole,
    refreshToken,
    expiresIn,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (
        !access_token ||
        access_role !== accessRole ||
        !refresh_token
      ) {
        if (accessRole !== 'apps') {
          logout(
            () =>
              (window.location.href =
                '/portal/assessment-automation/verify')
          );
        } else {
          logout(
            () => (window.location.href = '/auth/login')
          );
        }
      } else {
        setLoading(false);
      }
    }, 1000);
  }, [
    accessRole,
    access_role,
    access_token,
    logout,
    refresh_token,
  ]);

  if (loading || refreshToken.isLoading) {
    return <Loading cover="page" />;
  }

  return children;
};
