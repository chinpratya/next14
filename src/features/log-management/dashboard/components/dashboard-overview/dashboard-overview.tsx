import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { formatNumber, getColLayout } from '@/utils';

import { useGetReport } from '../../api/get-report';
import { useGetReportIndex } from '../../api/get-report-index';
import {
  RefreshState,
  ReportOverview,
} from '../../types';

import { DashboardOverviewCard } from './dashboard-overview-card';

type DashboardOverviewProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const DashboardOverview = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: DashboardOverviewProps) => {
  const { disabled, isRefresh, refreshTime } =
    refreshState;

  const payload = {
    module: 'LM',
    type: 'csv',
    report_type: 'organization',
    filter: {
      from: dayjs()
        .startOf('day')
        .subtract(29, 'day')
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
  };

  const indexData = useGetReportIndex({
    ...payload,
    report_type: 'count',
    filter: {
      ...payload.filter,
      type: 'indices',
    },
  });

  const monthData = useGetReport(payload);
  const dayData = useGetReport({
    ...payload,
    filter: {
      ...payload.filter,
      from: dayjs()
        .startOf('day')
        .add(7, 'hour')
        .toISOString(),
    },
  });

  const handleRefresh = () => {
    indexData.refetch();
    monthData.refetch();
    dayData.refetch();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, refreshTime);

    if (isRefresh) {
      handleRefresh();
      onRefresh();
    }
    if (disabled) clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, isRefresh, refreshTime]);

  useEffect(() => {
    if (
      indexData.isRefetching ||
      monthData.isRefetching ||
      dayData.isRefetching
    )
      handleChangeRefreshing('overview', true);
    else if (
      !indexData.isRefetching &&
      !monthData.isRefetching &&
      !dayData.isRefetching
    )
      handleChangeRefreshing('overview', false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    indexData.isRefetching,
    monthData.isRefetching,
    dayData.isRefetching,
  ]);

  return (
    <FallbackError
      isError={
        indexData.isError ||
        monthData.isError ||
        dayData.isError
      }
    >
      <Row gutter={[28, 16]} style={{ marginBottom: 20 }}>
        <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
          <DashboardOverviewCard
            title={
              <IntlMessage id="logManagement.indices.title" />
            }
            value={`${
              formatNumber(
                (indexData.data as ReportOverview)?.value
              ) ?? '0'
            }`}
            backgroundColor="#3e79f7"
            loading={
              monthData.isLoading ||
              dayData.isLoading ||
              indexData.isLoading
            }
            refreshing={
              monthData.isRefetching ||
              dayData.isRefetching ||
              indexData.isRefetching ||
              refreshState.loading
            }
          />
        </Col>
        <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
          <DashboardOverviewCard
            title={
              <IntlMessage id="logManagement.dashboard.LastEvent30Day" />
            }
            value={`${
              formatNumber(
                (monthData.data as ReportOverview)?.value
              ) ?? '0'
            }`}
            backgroundColor="#04D182"
            loading={
              monthData.isLoading ||
              dayData.isLoading ||
              indexData.isLoading
            }
            refreshing={
              monthData.isRefetching ||
              dayData.isRefetching ||
              indexData.isRefetching ||
              refreshState.loading
            }
          />
        </Col>
        <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
          <DashboardOverviewCard
            title={
              <IntlMessage id="logManagement.dashboard.LastEvent1Day" />
            }
            value={`${
              formatNumber(
                (dayData.data as ReportOverview)?.value
              ) ?? '0'
            }`}
            backgroundColor="#ffc542"
            loading={
              monthData.isLoading ||
              dayData.isLoading ||
              indexData.isLoading
            }
            refreshing={
              monthData.isRefetching ||
              dayData.isRefetching ||
              indexData.isRefetching ||
              refreshState.loading
            }
          />
        </Col>
      </Row>
    </FallbackError>
  );
};
