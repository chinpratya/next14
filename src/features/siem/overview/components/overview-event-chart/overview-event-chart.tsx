import { Card } from 'antd';
import dayjs from 'dayjs';
import EChartsReact from 'echarts-for-react';
import { useEffect } from 'react';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  RefreshState,
  useGetReport,
} from '@/features/log-management';

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
              data: Array.from({ length: 7 })
                .map((_, index) =>
                  dayjs()
                    .subtract(index, 'day')
                    .format('DD-MM-YYYY')
                )
                .reverse(),
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
            series: [
              {
                name: 'NAS-office',
                data: [3, 7, 8, 4, 3, 12, 8],
                type: 'line',
                showSymbol: false,
                smooth: true,
                color: '#3e79f7',
              },
              {
                name: 'Team Developer - SP',
                data: [8, 25, 14, 20, 46, 10, 30],
                type: 'line',
                showSymbol: false,
                smooth: true,
                color: '#04D182',
              },
              {
                name: 'Firewall-Fortigate',
                data: [11, 14, 8, 20, 16, 0, 10],
                type: 'line',
                showSymbol: false,
                smooth: true,
                color: '#ffc542',
              },
            ],
          }}
        />
      </Card>
    </FallbackError>
  );
};
