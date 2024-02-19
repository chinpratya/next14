import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Breadcrumb } from '@/types';

const getBreadcrumb = (
  meta: Record<string, unknown>,
  start: number,
  tabKeys: string[],
  router: NextRouter,
  dictionary?: Record<string, string>
) => {
  const { pathname, asPath, query } = router;
  const routeInfo = {
    ...query,
    ...meta,
  };
  const breadcrumb: Breadcrumb[] = [];
  const rootPaths = pathname.split('/');
  rootPaths.forEach((route, index) => {
    if (index < start) {
      return;
    }
    const isTab = tabKeys.includes(route);
    let destination = '' as string;
    if (isTab) {
      destination = asPath
        .split('/')
        .slice(0, index)
        .join('/');
    } else {
      destination = asPath
        .split('/')
        .slice(0, index + 1)
        .join('/');
    }

    const title = route
      .replace(/-/g, ' ')
      .replace(/\[|\]/g, '');

    breadcrumb.push({
      title:
        (routeInfo[title] as string) ??
        dictionary?.[title] ??
        title,
      path: destination,
    });
  });
  return breadcrumb;
};

export type UseBreadcrumb = {
  start?: number;
  meta?: Record<string, unknown>;
  tabKeys?: string[];
  dictionary?: Record<string, React.ReactNode>;
};

export const useBreadcrumb = ({
  start = 4,
  meta = {},
  tabKeys = [],
  dictionary,
}: UseBreadcrumb) => {
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState<
    Breadcrumb[]
  >([]);

  const { pathname } = router;

  useEffect(() => {
    if (pathname) {
      const breadcrumb = getBreadcrumb(
        meta,
        start,
        tabKeys,
        router,
        dictionary as Record<string, string>
      );
      setBreadcrumb(breadcrumb);
    }
  }, [
    pathname,
    meta,
    start,
    router,
    tabKeys,
    dictionary,
  ]);

  return {
    breadcrumb,
  };
};
