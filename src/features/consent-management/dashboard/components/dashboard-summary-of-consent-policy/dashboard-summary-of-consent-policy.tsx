import { Card } from 'antd';
import EChartsReact from 'echarts-for-react';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardPrivatePolicy } from '../../api/get-dashboard-private-policy';

type DashboardSummaryOfConsentPolicyProps = {
  selectedDuration: string;
};

export const DashboardSummaryOfConsentPolicy = ({
  selectedDuration,
}: DashboardSummaryOfConsentPolicyProps) => {
  const { data, isLoading, isError } =
    useGetDashboardPrivatePolicy({
      duration: selectedDuration,
    });

  const [series, setSeries] = useState<
    Record<string, unknown>[]
  >([]);

  useEffect(() => {
    if (data) {
      const value =
        data?.data.map((item) => ({
          name: item.name,
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: item.value ?? [],
        })) ?? [];
      setSeries(value);
    }
  }, [data]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.dashboard.summaryOfConsentPolicy" />
        }
      >
        <EChartsReact
          option={{
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            legend: {
              right: 0,
            },
            color: ['#496E2D', '#407BFF', '#F26716'],
            grid: {
              left: '8%',
              right: '3%',
              bottom: '8%',
              containLabel: true,
            },
            xAxis: [
              {
                name: 'จำนวนการให้ความยินยอม',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [20, 0, 0, 0],
                  fontWeight: 'bold',
                },
                type: 'value',
              },
            ],
            yAxis: [
              {
                type: 'category',
                name: 'กิจกรรม',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [0, 0, 100, 0],
                  fontWeight: 'bold',
                },
                data: data?.dataLabel ?? [],
              },
            ],
            series: series,
          }}
          style={{ height: 400 }}
          notMerge
          lazyUpdate
          showLoading={isLoading}
          opts={{ renderer: 'svg' }}
        />
      </Card>
    </FallbackError>
  );
};
