import { Card } from 'antd';
import EChartsReact from 'echarts-for-react';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardCookieConsent } from '../../api/get-dashboard-cookie-consent';

type DashboardSummaryOfConsentCookieProps = {
  selectedDuration: string;
};

export const DashboardSummaryOfConsentCookie = ({
  selectedDuration,
}: DashboardSummaryOfConsentCookieProps) => {
  const { data, isError, isLoading } =
    useGetDashboardCookieConsent({
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
          <IntlMessage id="consentManagement.dashboard.summaryOfConsentCookie" />
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
            color: [
              '#2AC3ED',
              '#0C1862',
              '#A461D8',
              '#FFC542',
              '#ED145B',
              '#3ba272',
              '#fc8452',
              '#ea7ccc',
            ],
            grid: {
              left: '8%',
              right: '3%',
              bottom: '7%',
              containLabel: true,
            },
            xAxis: [
              {
                name: 'เว็บไซต์',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [20, 0, 0, 0],
                  fontWeight: 'bold',
                },
                type: 'category',
                data: data?.dataLabel ?? [],
              },
            ],
            yAxis: [
              {
                type: 'value',
                name: 'จำนวนการให้ความยินยอม',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [0, 0, 60, 0],
                  fontWeight: 'bold',
                },
              },
            ],
            series: series,
          }}
          style={{ height: 400 }}
          notMerge
          lazyUpdate
          opts={{ renderer: 'svg' }}
          showLoading={isLoading}
        />
      </Card>
    </FallbackError>
  );
};
