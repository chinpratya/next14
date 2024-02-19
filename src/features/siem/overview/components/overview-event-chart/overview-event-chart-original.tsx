import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import EChartsReact from 'echarts-for-react';
import { useEffect } from 'react';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  RefreshState,
  ReportChart,
  useGetReport,
} from '@/features/log-management';
import { constant } from '@/features/siem';

type OverviewEventChartProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const OverviewEventChart = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: OverviewEventChartProps) => {
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetReport({
    module: 'SIEM',
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
      handleChangeRefreshing('event', true);
    else handleChangeRefreshing('event', false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.dashboard.event" />
        }
        loading={isLoading}
        bodyStyle={{ paddingBottom: 0 }}
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />

        {(data as ReportChart)?.value &&
        (data as ReportChart).value.length > 0 ? (
          <EChartsReact
            style={{
              height: 370,
            }}
            option={{
              legend: {
                orient: 'horizontal',
                right: 0,
                top: 0,
              },
              tooltip: {
                trigger: 'axis',
              },
              xAxis: {
                type: 'category',
                nameLocation: 'middle',
                boundaryGap: false,
                data: (data as ReportChart)?.meta ?? [],
              },
              yAxis: {
                type: 'value',
                position: 'left',
                axisLine: {
                  symbol: 'arrow',
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              },
              series:
                (data as ReportChart)?.value.map(
                  (item, index) => ({
                    name: item.label,
                    data: item.value,
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    color: constant.color?.[index],
                  })
                ) ?? [],
            }}
          />
        ) : (
          <Empty className="mb-5" />
        )}
      </Card>
    </FallbackError>
  );
};
