import { HistoryOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  Row,
} from 'antd';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';
import { RefreshState } from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import {
  OverviewList,
  OverviewRisk,
  OverviewAlertSignatureRule,
  OverviewCategoryAttack,
  OverviewCount,
  useListWidgetReport,
  UseGetDeviceCount,
  OverviewEventChart,
} from '@/features/siem';
import { permissions, products } from '@/permissions';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const OverviewPage = () => {
  const { t } = useTranslation();

  const [refreshState, setRefreshState] =
    useState<RefreshState>({
      disabled: false,
      refreshTime: 30 * 1000,
      refreshLabel: t(
        'logManagement.dashboard.thirtySecond'
      ),
      isRefreshing: {},
      loading: false,
      isRefresh: false,
    });

  const listWidgetReport = useListWidgetReport();
  const deviceCount = UseGetDeviceCount({
    module: 'SIEM',
    type: 'csv',
    report_type: 'count',
    filter: {
      from: dayjs()
        .startOf('day')
        .add(7, 'h')
        .toISOString(),
      to: dayjs().endOf('day').add(7, 'h').toISOString(),
      indices: [],
      hosts: [],
      type: 'device',
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

  const onRefresh = () => {
    setRefreshState((prev) => ({
      ...prev,
      isRefresh: false,
    }));
  };

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
      listWidgetReport.refetch();
      deviceCount.refetch();
    }, refreshState.refreshTime);

    if (refreshState.isRefresh) {
      listWidgetReport.refetch();
      deviceCount.refetch();
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
    if (
      listWidgetReport.isRefetching ||
      deviceCount.isRefetching
    )
      handleChangeRefreshing('overview', true);
    else if (
      !listWidgetReport.isRefetching &&
      !deviceCount.isRefetching
    )
      handleChangeRefreshing('overview', false);
  }, [
    listWidgetReport.isRefetching,
    deviceCount.isRefetching,
  ]);

  useEffect(() => {
    const {
      event,
      overview,
      alertSignatureRule,
      categoryAttack,
      incident,
    } = refreshState.isRefreshing;
    if (
      !event &&
      !alertSignatureRule &&
      !overview &&
      !categoryAttack &&
      !incident
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

  if (listWidgetReport.isLoading || deviceCount.isLoading)
    return <Loading cover="content" />;

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="siem.subModule.overview" />
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

      <FallbackError isError={listWidgetReport.isError}>
        <OverviewCount
          data={listWidgetReport.data}
          isRefetching={
            listWidgetReport.isRefetching ||
            refreshState.loading
          }
        />
        <OverviewRisk
          isRefetching={
            listWidgetReport.isRefetching ||
            refreshState.loading
          }
          severityCount={
            listWidgetReport.data?.severity_count
          }
        />
      </FallbackError>

      <OverviewEventChart
        refreshState={refreshState}
        handleChangeRefreshing={handleChangeRefreshing}
        onRefresh={onRefresh}
      />

      <Row
        gutter={[24, 24]}
        className={css`
          margin-bottom: 20px;
        `}
      >
        <Col {...getColLayout(12)}>
          <OverviewCategoryAttack
            refreshState={refreshState}
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            onRefresh={onRefresh}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <OverviewAlertSignatureRule
            refreshState={refreshState}
            handleChangeRefreshing={
              handleChangeRefreshing
            }
            onRefresh={onRefresh}
          />
        </Col>
      </Row>

      <OverviewList
        refreshState={refreshState}
        onRefresh={onRefresh}
        handleChangeRefreshing={handleChangeRefreshing}
      />
    </>
  );
};

OverviewPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions['cyber:siem:dashboard:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default OverviewPage;
