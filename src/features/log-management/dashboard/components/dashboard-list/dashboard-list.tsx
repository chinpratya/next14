import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useGetReport } from '../../api/get-report';
import { RefreshState, ReportTable } from '../../types';

import { DashboardTable } from './dashboard-table';

type DashboardListProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const DashboardList = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: DashboardListProps) => {
  const { disabled, isRefresh, refreshTime } =
    refreshState;

  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetReport({
    module: 'LM',
    type: 'csv',
    report_type: 'indices',
    filter: {
      from: dayjs()
        .startOf('day')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs()
        .endOf('day')
        .add(7, 'hour')
        .toISOString(),
      indices: [],
      hosts: [],
      type: 'archive',
      limit: 3,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, refreshTime);

    if (isRefresh) {
      refetch();
      onRefresh();
    }
    if (disabled) clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, isRefresh, refreshTime]);

  useEffect(() => {
    if (isRefetching)
      handleChangeRefreshing('storageList', true);
    else handleChangeRefreshing('storageList', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.dashboard.archive" />
        }
        loading={isLoading}
        className="mb-0 h-100"
        bodyStyle={{
          height: 'calc(100% - 41.5px)',
        }}
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />
        {data &&
        Object.entries(data as ReportTable).length > 0 ? (
          <div
            className={css`
              max-height: 600px;
              overflow-y: scroll;
              margin-bottom: 0;
            `}
          >
            <DashboardTable
              data={(data as ReportTable) ?? []}
              loading={isLoading}
            />
          </div>
        ) : (
          <Flex
            align="center"
            justify="center"
            className="h-100"
          >
            <Empty className="mb-4" />
          </Flex>
        )}
      </Card>
    </FallbackError>
  );
};
