import { Card, Empty } from 'antd';
import EChartsReact from 'echarts-for-react';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { IntlMessage } from '@/components/util-components/intl-message';
import { constant } from '@/features/siem';

import { ReportChart } from '../../types';

type DashboardEventChartProps = {
  data?: ReportChart;
  loading?: boolean;
  refreshing?: boolean;
};

export const DashboardEventChart = ({
  data,
  loading,
  refreshing = false,
}: DashboardEventChartProps) => {
  return (
    <Card
      title={
        <IntlMessage id="logManagement.dashboard.event" />
      }
      loading={loading}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <LoadingOverlay visible={refreshing} />

      {data && data?.value.length > 0 ? (
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
              data: data?.meta ?? [],
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
              data?.value.map((item, index) => ({
                name: item.label,
                data: item.value,
                type: 'line',
                showSymbol: false,
                smooth: true,
                color: constant.color?.[index],
              })) ?? [],
          }}
        />
      ) : (
        <Empty className="mb-5" />
      )}
    </Card>
  );
};
