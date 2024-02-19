import { HistoryOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogSearchStore } from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { LogSearchDeviceSource } from '@/features/siem';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

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
      label: t('logManagement.logSearch.second', {
        value: 10,
      }),
    },
    {
      key: '30 seconds',
      label: t('logManagement.logSearch.second', {
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
          <IntlMessage id="siem.logSearch.logSearch" />
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
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [permissions['cyber:siem:search:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default LogSearchPage;
