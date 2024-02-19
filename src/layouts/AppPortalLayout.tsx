import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useRefreshToken } from '@/features/compliance';
import { useAuth } from '@/stores/auth';
import { Loading } from '@components/loading';

import AppLayout, { AppLayoutProps } from './AppLayout';

export type AppPortalLayoutProps = AppLayoutProps;

const AppPortalLayout = ({
  children,
  navSideEnable = true,
}: AppPortalLayoutProps) => {
  const router = useRouter();
  const auth = useAuth();
  const { submit: refreshToken, isLoading } =
    useRefreshToken({
      onSuccess: (refreshToken) => {
        auth.refreshToken({
          refresh_token: refreshToken.RefreshToken,
          access_token: refreshToken.AccessToken,
          expires_in: refreshToken.AccessTokenExpiresIn,
          refresh_expires_in:
            refreshToken.RefreshTokenExpiresIn,
        });
      },
    });

  useEffect(() => {
    if (auth?.refresh_token) {
      refreshToken(auth?.refresh_token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  if (isLoading) {
    return <Loading cover="page" />;
  }

  return (
    <AppLayout
      accessRole="portal"
      navSideEnable={navSideEnable}
    >
      {children}
    </AppLayout>
  );
};
export default React.memo(AppPortalLayout);
