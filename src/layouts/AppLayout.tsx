import { Layout, Grid } from 'antd';
import React, { Suspense } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { ErrorBoundary } from 'react-error-boundary';

import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
  DIR_RTL,
  DIR_LTR,
  NAV_TYPE_SIDE,
} from '@/config/theme';
import { useListOrganizationOfUser } from '@/features/admin';
import { Protected } from '@/features/auth';
import { useGetProfile } from '@/features/profile';
import { useAppPermission } from '@/hooks';
import { useTheme } from '@/stores/theme';
import utils from '@/utils';
import { Loading } from '@components/loading';
import { Footer } from '@layoutComponents/footer';
import { HeaderNav } from '@layoutComponents/header-nav';
import { MobileNav } from '@layoutComponents/mobile-nav';
import { SideNav } from '@layoutComponents/side-nav';
import { TopNav } from '@layoutComponents/top-nav';
import { FallbackError } from '@utilComponents/fallback-error';
import { Seo } from '@utilComponents/seo';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const contentProps = {
  style: {
    backgroundColor: '#f6f6f6',
  },
};

export type AppLayoutProps = {
  children: React.ReactNode;
  navLeftChildren?: React.ReactNode;
  navSideEnable?: boolean;
  accessRole?: string;
  permission?: {
    moduleName: string[];
    productName: string;
    policies: string[];
    condition?: 'AND' | 'OR';
  };
};

const AppLayout = ({
  children,
  navSideEnable = true,
  accessRole = 'apps',
  permission,
  navLeftChildren,
}: AppLayoutProps) => {
  const { navCollapsed, navType, direction } = useTheme();
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile =
    screens.length === 0
      ? false
      : !screens.includes('lg');
  const isNavSide =
    navType === NAV_TYPE_SIDE && navSideEnable;
  const isNavTop = navType === NAV_TYPE_TOP;

  const { status } = useThemeSwitcher();

  const getProfile = useGetProfile();
  const listOrganization = useListOrganizationOfUser();

  const { isAllow, isLoading } = useAppPermission({
    condition: permission?.condition,
    moduleName: permission?.moduleName,
    policies: permission?.policies,
    productName: permission?.productName,
  });

  if (
    status !== 'loaded' ||
    getProfile.isLoading ||
    listOrganization.isLoading
  ) {
    return <Loading cover="page" />;
  }

  const getLayoutGutter = () => {
    if (isNavTop || isMobile || !navSideEnable) {
      return 0;
    }
    return navCollapsed
      ? SIDE_NAV_COLLAPSED_WIDTH
      : SIDE_NAV_WIDTH;
  };

  const getLayoutDirectionGutter = () => {
    if (direction === DIR_LTR) {
      return { paddingLeft: getLayoutGutter() };
    }
    if (direction === DIR_RTL) {
      return { paddingRight: getLayoutGutter() };
    }
    return { paddingLeft: getLayoutGutter() };
  };

  return (
    <>
      <Seo />
      <Protected accessRole={accessRole}>
        <Layout>
          <HeaderNav
            isMobile={isMobile}
            navSideEnable={navSideEnable}
            navLeftChildren={navLeftChildren}
          />
          {isNavTop && !isMobile ? <TopNav /> : null}
          <Layout className="app-container">
            {isNavSide && !isMobile ? (
              <SideNav
                routeInfo={[]}
                loading={isLoading}
              />
            ) : null}
            <Layout
              className="app-layout"
              style={getLayoutDirectionGutter()}
            >
              <div
                className={`app-content ${
                  isNavTop ? 'layout-top-nav' : ''
                }`}
                {...contentProps}
              >
                <Content>
                  <Suspense
                    fallback={<Loading cover="content" />}
                  >
                    <ErrorBoundary
                      fallback={<FallbackError />}
                    >
                      {isLoading ? (
                        <Loading cover="content" />
                      ) : !isAllow ? (
                        <FallbackError
                          isError
                          error={{
                            title: 'Permission',
                            description:
                              'คุณไม่มีสิทธ์เข้าใช้งานส่วนนี้',
                          }}
                        />
                      ) : (
                        children
                      )}
                    </ErrorBoundary>
                  </Suspense>
                </Content>
              </div>
              <Footer />
            </Layout>
          </Layout>
          {isMobile && <MobileNav />}
        </Layout>
      </Protected>
    </>
  );
};
export default React.memo(AppLayout);
