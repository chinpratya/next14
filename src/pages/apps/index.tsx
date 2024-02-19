import styled from '@emotion/styled';
import { useSetState } from '@mantine/hooks';
import { Input, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { APP_ICONS } from '@/config/appIcons';
import { APPS_CONFIG } from '@/config/modules';
import { ModulesList } from '@/features/theme';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const AppsPageWrapper = styled.div`
  .ant-tabs-nav {
    .ant-tabs-nav-list {
      .ant-tabs-tab {
        .ant-tabs-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      }
    }
  }
`;

const APP_ITEMS = APPS_CONFIG.map((app) => ({
  label: (
    <>
      {APP_ICONS[app.id]} {app.title}
    </>
  ),
  key: app.id,
}));

const AppsPage = () => {
  const router = useRouter();
  const [state, setState] = useSetState({
    search: '',
    current: 'datafence',
  });

  const onSearch = (value: string) => {
    setState({ search: value ?? '' });
  };

  const selectApp = (value: string) => {
    setState({ current: value ?? '' });
  };

  const onNavigate = (path: string) => {
    if (path.startsWith('https')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      router.replace(path, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const currentApp = APPS_CONFIG.find(
      (app) => app.id === router.query.appId
    );
    if (currentApp) {
      setState({ current: currentApp.id });
    }
  }, [router, setState]);

  return (
    <AppsPageWrapper>
      <PageHeader
        title="โมดูล"
        overlap
        extra={
          <Input.Search
            placeholder="ค้นหา"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            enterButton
          />
        }
      />
      <Tabs
        activeKey={state.current}
        onChange={selectApp}
        items={APP_ITEMS}
      />
      <ModulesList
        appId={state.current}
        search={state.search}
        onClick={onNavigate}
      />
    </AppsPageWrapper>
  );
};

AppsPage.getLayout = (page: ReactNode) => (
  <AppLayout navSideEnable={false}>{page}</AppLayout>
);

export default AppsPage;
