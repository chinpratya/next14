import '@/styles/dragging.css';
import '@/styles/globals.css';
import '@/styles/popconfirm.css';
import '@/styles/light-theme.css';
import '@/styles/table.css';
import '@/styles/nouislider.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement, ReactNode } from 'react';

import { API_MOCKING } from '@/config/constants';
import { MSWWrapperProps } from '@/lib/msw';
import { AppProvider } from '@/providers/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MSWWrapper = dynamic<MSWWrapperProps>(() =>
  import('@/lib/msw').then(({ MSWWrapper }) => MSWWrapper)
);

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => page);

  const pageContent = getLayout(
    <Component {...pageProps} />
  );

  return (
    <AppProvider>
      {API_MOCKING ? (
        <MSWWrapper>{pageContent}</MSWWrapper>
      ) : (
        pageContent
      )}
    </AppProvider>
  );
}
