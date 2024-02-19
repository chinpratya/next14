import { HistoryOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LogSearchDeviceSource,
  useLogSearchStore,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const { lm, core } = logManagementModules;

const LogSearchPage = () => {
  const { t } = useTranslation();
  const { isLoading, refetch, handleRefetch } =
    useLogSearchStore();

  const items: MenuProps['items'] = [
    {
      key: 'refresh',
      label: t('logManagement.dashboard.refreshNow'),
    },
    { type: 'divider' },
    {
      key: 'disable',
      label: t('logManagement.dashboard.disable'),
    },
    {
      key: '10 seconds',
      label: t('logManagement.logSearch.seconds', {
        value: 10,
      }),
    },
    {
      key: '30 seconds',
      label: t('logManagement.logSearch.seconds', {
        value: 30,
      }),
    },
    {
      key: '1 minute',
      label: t('logManagement.logSearch.minute', {
        value: 1,
      }),
    },
    {
      key: '1 hour',
      label: t('logManagement.logSearch.hour', {
        value: 1,
      }),
    },
  ];

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.logSearch.title" />
        }
        extra={
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => handleRefetch(key),
            }}
            placement="bottomLeft"
            disabled={isLoading || refetch.isCustomDate}
          >
            <Button
              style={{ textTransform: 'uppercase' }}
            >
              <HistoryOutlined
                style={{ fontSize: 16, marginRight: 8 }}
              />
              <IntlMessage
                id={refetch.label.key}
                options={{ value: refetch.label.value }}
              />
            </Button>
          </Dropdown>
        }
      />
      <LogSearchDeviceSource />
    </>
  );
};

LogSearchPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:search:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default LogSearchPage;
