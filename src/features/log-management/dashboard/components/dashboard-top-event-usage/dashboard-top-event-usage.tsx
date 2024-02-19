import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Col, Empty, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { CirclePacking } from '@/components/chart-components/circle-packing-chart';
import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { constant } from '@/features/siem';
import { formatNumber } from '@/utils';

import { useGetReport } from '../../api/get-report';
import {
  RefreshState,
  ReportResponse,
} from '../../types';

type DashboardTopEventUsageProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const DashboardTopEventUsage = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: DashboardTopEventUsageProps) => {
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetReport({
    module: 'LM',
    type: 'csv',
    report_type: 'count',
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
      type: 'event',
      limit: 5,
    },
  });

  const { disabled, isRefresh, refreshTime } =
    refreshState;

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
      handleChangeRefreshing('topEvent', true);
    else handleChangeRefreshing('topEvent', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.dashboard.top5EventUsage" />
        }
        loading={isLoading}
        className="h-100 mb-0"
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />
        {(data as ReportResponse)?.length > 0 ? (
          <Row justify="center">
            <Col span={24}>
              <CirclePacking
                leavesOnly
                labelsSkipRadius={24}
                data={{
                  name: 'total',
                  color: '#fff',
                  children:
                    (data as ReportResponse)?.map(
                      (item, index) => ({
                        name: item.hostname as string,
                        color:
                          constant.color?.[index] ?? '',
                        label: item.hostname as string,
                        value: item.event as number,
                      })
                    ) ?? [],
                }}
              />
            </Col>
            <Col
              span={14}
              className={css`
                display: flex;
                flex-direction: column;
                gap: 14px;
                max-width: 480px;
              `}
            >
              {(data as ReportResponse)?.map(
                (item, index) => (
                  <Flex
                    align="center"
                    justify="space-between"
                    className="mt-3"
                    key={item.hostname}
                    gap={4}
                  >
                    <Typography.Text
                      className={css`
                        display: flex;
                        align-items: center;
                        color: #72849a;
                      `}
                    >
                      <span
                        className={css`
                          display: inline-block;
                          width: 6px;
                          height: 6px;
                          background: ${constant.color?.[
                            index
                          ] ?? ''};
                          border-radius: 33px;
                          margin-right: 4px;
                        `}
                      />
                      {item.hostname}
                    </Typography.Text>
                    <Typography.Text strong>
                      {formatNumber(item.event as number)}
                    </Typography.Text>
                  </Flex>
                )
              )}
            </Col>
          </Row>
        ) : (
          <Empty className="py-5" />
        )}
      </Card>
    </FallbackError>
  );
};
