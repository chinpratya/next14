import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ReactNode, useEffect } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { ErrorBoundary } from 'react-error-boundary';

import { Notifications } from '@/components/notifications';
import { IS_DEVELOPMENT } from '@/config/constants';
import { theme } from '@/config/theme';
import { useBodyClass } from '@/hooks';
import { resources } from '@/lang';
import { queryClient } from '@/lib/react-query';
import { useTheme } from '@/stores/theme';
import { FallbackError } from '@utilComponents/fallback-error';

const themes = {
  light: `/css/light-theme.css`,
  dark: `/css/dark-theme.css`,
};

export type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const { locale, direction } = useTheme();
  const currentAppLocale = resources[locale];

  useBodyClass(`dir-${direction}`);
  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    root.setAttribute('dir', direction);
  }, [direction]);

  return (
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme="light"
    >
      <AntdConfigProvider
        direction={theme.direction}
        locale={currentAppLocale.antd}
      >
        <Notifications />
        <QueryClientProvider client={queryClient}>
          {IS_DEVELOPMENT && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <ErrorBoundary
            fallback={<FallbackError />}
            onError={(error, info) => {
              console.error(
                `Error Boundary:`,
                error,
                info
              );
            }}
          >
            {children}
          </ErrorBoundary>
        </QueryClientProvider>
      </AntdConfigProvider>
    </ThemeSwitcherProvider>
  );
};
