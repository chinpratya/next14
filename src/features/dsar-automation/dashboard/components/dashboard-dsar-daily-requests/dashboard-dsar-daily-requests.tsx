import { Card, Empty } from 'antd';

import { Line } from '@/components/chart-components/line';
import { ECOption } from '@/types';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDsarDashboardByTime } from '../../api/get-dsar-dashboard-bytime';
import { DashboardByTime } from '../../types';

export type DashboardDsarDailyRequestsProps = {
  duration?: string;
};

export const DashboardDsarDailyRequests = ({
  duration,
}: DashboardDsarDailyRequestsProps) => {
  const { data, isLoading, isError } =
    useGetDsarDashboardByTime({
      duration,
    });
  const generateOptionsChart = (
    data: DashboardByTime[]
  ) => {
    return {
      title: {
        text: 'แนวโน้ม',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: -4,
          formatter: function (value: string) {
            const max = 8;
            if (value.length > max) {
              const text = value.slice(0, max) + '..';

              return text;
            } else {
              return null;
            }
          },
          textStyle: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          axisTick: {
            alignWithLabel: true,
          },
          boundaryGap: true,
        },
        data: data?.map((v) => v.key),
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      series: [
        {
          name: 'ข้อมูลพื้นฐาน',
          type: 'line',
          data: data?.map((v) => v.value),
          smooth: true,
        },
      ],
    } as ECOption;
  };

  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.dashboard.dailyRequest" />
      }
      loading={isLoading}
    >
      <FallbackError isError={isError}>
        {data && data.length ? (
          <Line {...generateOptionsChart(data ?? [])} />
        ) : (
          <Empty />
        )}
      </FallbackError>
    </Card>
  );
};
