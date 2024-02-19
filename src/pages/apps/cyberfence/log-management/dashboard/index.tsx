import { HistoryOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useMediaQuery } from '@mantine/hooks';
import type { MenuProps } from 'antd';
import { Button, Col, Dropdown, Row } from 'antd';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/share-components/page-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  DashboardEventChart,
  DashboardLastlogReceive,
  DashboardList,
  DashboardOverview,
  DashboardTopEventUsage,
  DashboardTotalStorage,
  RefreshState,
  ReportChart,
  useGetReport,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { getColLayout } from '@/utils';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const DashboardPage = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(min-width: 1400px)');

  const [refreshState, setRefreshState] =
    useState<RefreshState>({
      disabled: false,
      refreshTime: 30 * 1000,
      refreshLabel:
        'logManagement.dashboard.thirtySecond',
      isRefresh: false,
      isRefreshing: {},
      loading: true,
    });

  const chartData = useGetReport({
    module: 'LM',
    type: 'csv',
    report_type: 'lists',
    filter: {
      from: dayjs()
        .startOf('day')
        .subtract(6, 'day')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs()
        .endOf('day')
        .add(7, 'hour')
        .toISOString(),
      indices: [],
      hosts: [],
      type: 'event',
    },
  });

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
    // {
    //   key: '5',
    //   label: t('logManagement.dashboard.fiveSecond'),
    // },
    // {
    //   key: '15',
    //   label: t('logManagement.dashboard.fifteenSecond'),
    // },
    {
      key: '30',
      label: t('logManagement.dashboard.thirtySecond'),
    },
    {
      key: '60',
      label: t('logManagement.dashboard.oneMinute'),
    },
    {
      key: '300',
      label: t('logManagement.dashboard.fiveMinute'),
    },
  ];

  const onRefresh = () =>
    setRefreshState((prev) => ({
      ...prev,
      isRefresh: false,
    }));

  const handleChangeRefreshing = (
    key: string,
    value: boolean
  ) => {
    setRefreshState((prev) => ({
      ...prev,
      isRefreshing: {
        ...prev.isRefreshing,
        [key]: value,
      },
    }));
  };

  const onChangeRefreshTime = (key: string | number) => {
    let newState = {};

    switch (key) {
      case 'refresh':
        newState = {
          disabled: refreshState.disabled,
          isRefresh: true,
        };
        break;
      case 'disable':
        newState = {
          disabled: true,
          refreshLabel: 'logManagement.dashboard.disable',
        };
        break;
      case '5':
        newState = {
          refreshTime: 5 * 1000,
          refreshLabel:
            'logManagement.dashboard.fiveSecond',
        };
        break;
      case '15':
        newState = {
          refreshTime: 15 * 1000,
          refreshLabel:
            'logManagement.dashboard.fifteenSecond',
        };
        break;
      case '30':
        newState = {
          refreshTime: 30 * 1000,
          refreshLabel:
            'logManagement.dashboard.thirtySecond',
        };
        break;
      case '60':
        newState = {
          refreshTime: 60 * 1000,
          refreshLabel:
            'logManagement.dashboard.oneMinute',
        };
        break;
      case '300':
        newState = {
          refreshTime: 300 * 1000,
          refreshLabel:
            'logManagement.dashboard.fiveMinute',
        };
        break;
      default:
        return;
    }

    setRefreshState((prev) => ({
      ...prev,
      isRefresh: false,
      disabled: false,
      ...newState,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      chartData.refetch();
    }, refreshState.refreshTime);

    if (refreshState.isRefresh) {
      chartData.refetch();
      onRefresh();
    }
    if (refreshState.disabled) clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refreshState.disabled,
    refreshState.isRefresh,
    refreshState.refreshTime,
  ]);

  useEffect(() => {
    if (chartData.isRefetching)
      handleChangeRefreshing('event', true);
    else handleChangeRefreshing('event', false);
  }, [chartData.isRefetching]);

  useEffect(() => {
    const {
      event,
      lastlogReceive,
      overview,
      storageList,
      topEvent,
      totalStorage,
    } = refreshState.isRefreshing;
    if (
      !event &&
      !lastlogReceive &&
      !overview &&
      !storageList &&
      !topEvent &&
      !totalStorage
    ) {
      setTimeout(() => {
        setRefreshState((prev) => ({
          ...prev,
          loading: false,
        }));
      }, 500);
    } else
      setRefreshState((prev) => ({
        ...prev,
        loading: true,
      }));
  }, [refreshState.isRefreshing]);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.dashboard.title" />
        }
        extra={
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) =>
                onChangeRefreshTime(key),
            }}
            placement="bottomLeft"
            disabled={refreshState.loading}
          >
            <Button
              style={{ textTransform: 'uppercase' }}
            >
              <HistoryOutlined
                style={{ fontSize: 16, marginRight: 8 }}
              />
              <IntlMessage
                id={refreshState.refreshLabel}
              />
            </Button>
          </Dropdown>
        }
      />

      <DashboardOverview
        refreshState={refreshState}
        onRefresh={onRefresh}
        handleChangeRefreshing={handleChangeRefreshing}
      />

      <FallbackError isError={chartData.isError}>
        <DashboardEventChart
          data={chartData.data as ReportChart}
          loading={chartData.isLoading}
          refreshing={
            chartData.isRefetching || refreshState.loading
          }
        />
      </FallbackError>

      <Row gutter={[20, 0]}>
        <Col
          {...getColLayout(16)}
          className="d-flex flex-column"
          order={matches ? 0 : 1}
        >
          <DashboardTotalStorage
            refreshState={refreshState}
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            onRefresh={onRefresh}
          />
          <DashboardList
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            refreshState={refreshState}
            onRefresh={onRefresh}
          />
        </Col>
        <Col
          {...getColLayout(8)}
          order={matches ? 1 : 0}
          className={css`
            margin-bottom: ${matches ? '0' : '20px'};
          `}
        >
          <DashboardTopEventUsage
            refreshState={refreshState}
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            onRefresh={onRefresh}
          />
        </Col>
        <Col
          {...getColLayout(24)}
          order={2}
          style={{ marginTop: 20 }}
        >
          <DashboardLastlogReceive
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            refreshState={refreshState}
            onRefresh={onRefresh}
          />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [
          permissions['cyber:lm:dashboard:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default DashboardPage;
