import { Grid } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAppPermission } from '@/hooks';
import { AppLayout } from '@/layouts';
import utils from '@/utils';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListDomain } from '../../domain';

import { DomainSelect } from './components/domain-select';

const { useBreakpoint } = Grid;

export type AppCookieLayoutProps = {
  children: React.ReactNode;
  permission?: {
    moduleName: string[];
    productName: string;
    policies: string[];
    condition?: 'AND' | 'OR';
  };
};

const WEBSITE_PATH =
  '/apps/datafence/cookie-management/websites';

export const AppCookieLayout = ({
  children,
  permission,
}: AppCookieLayoutProps) => {
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile =
    screens.length === 0
      ? false
      : !screens.includes('lg');

  const router = useRouter();

  const domainId = router.query.domainId as string;

  const { data, isLoading } = useListDomain({
    search: domainId,
  });

  const { isAllow } = useAppPermission({
    condition: permission?.condition,
    moduleName: permission?.moduleName,
    policies: permission?.policies,
    productName: permission?.productName,
  });

  useEffect(() => {
    if (
      data?.totalRecord === 0 &&
      !isLoading &&
      !domainId
    ) {
      router.replace(
        {
          pathname: WEBSITE_PATH,
          query: {
            required: true,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }

    if (
      _.get(data, 'totalRecord', 0) > 0 &&
      !isLoading &&
      !domainId
    ) {
      router.replace(
        {
          pathname: WEBSITE_PATH,
          query: {
            required: false,
            domainId: data?.data?.[0]?.domainID,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [
    data,
    data?.totalRecord,
    domainId,
    isLoading,
    router,
  ]);

  const navLeftChildren =
    router.pathname === WEBSITE_PATH ||
    router.pathname ===
      '/apps/datafence/cookie-management/cookie-consent' ? null : (
      <>
        <DomainSelect isMobile={isMobile} />
      </>
    );

  if (isLoading) {
    return <Loading cover="page" />;
  }

  return (
    <AppLayout navLeftChildren={navLeftChildren}>
      {!isAllow ? (
        <FallbackError
          isError
          error={{
            title: 'Permission',
            description: 'คุณไม่มีสิทธ์เข้าใช้งานส่วนนี้',
          }}
        />
      ) : (
        children
      )}
    </AppLayout>
  );
};
