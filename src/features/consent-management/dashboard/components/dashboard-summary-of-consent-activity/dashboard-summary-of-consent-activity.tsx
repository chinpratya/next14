import { Card } from 'antd';
import EChartsReact from 'echarts-for-react';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardActivityGroup } from '../../api/get-dashboard-activity-group';

type DashboardSummaryOfConsentActivityProps = {
  selectedDuration: string;
};

export const DashboardSummaryOfConsentActivity = ({
  selectedDuration,
}: DashboardSummaryOfConsentActivityProps) => {
  const { data, isLoading, isError } =
    useGetDashboardActivityGroup({
      duration: selectedDuration,
    });

  const [dataSource, setDataSource] = useState<
    Record<string, unknown>
  >({
    dataLabel: [],
    accept: [],
    reject: [],
    mix: [],
  });

  useEffect(() => {
    if (data) {
      const dataLabel: string[] = [];
      const accept: number[] = [];
      const reject: number[] = [];
      const mix: number[] = [];

      data.map((item) => {
        dataLabel.push(item.dataLabel);
        item.data.map((value) => {
          if (value.type === 'accept')
            accept.push(value.count);
          else if (value.type === 'reject')
            reject.push(value.count);
          else if (value.type === 'mix')
            mix.push(value.count);
        });
      });

      setDataSource({ dataLabel, accept, reject, mix });
    }
  }, [data]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.dashboard.summaryOfConsentActivity" />
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
            color: ['#04D182', '#FF9811', '#6F42C1'],
            grid: {
              left: '8%',
              right: '3%',
              bottom: '8%',
              containLabel: true,
            },
            xAxis: [
              {
                name: 'กิจกรรม',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [20, 0, 0, 0],
                  fontWeight: 'bold',
                },
                type: 'category',
                data: dataSource.dataLabel,
              },
            ],
            yAxis: [
              {
                type: 'value',
                name: 'จำนวนการให้ความยินยอม',
                nameLocation: 'middle',
                nameTextStyle: {
                  padding: [0, 0, 50, 0],
                  fontWeight: 'bold',
                },
              },
            ],
            series: [
              {
                name: 'ยินยอม',
                type: 'bar',
                emphasis: {
                  focus: 'series',
                },
                data: dataSource.accept,
              },
              {
                name: 'ไม่ยินยอม',
                type: 'bar',
                emphasis: {
                  focus: 'series',
                },
                data: dataSource.reject,
              },
              {
                name: 'ยินยอมบางส่วน',
                type: 'bar',
                emphasis: {
                  focus: 'series',
                },
                data: dataSource.mix,
              },
            ],
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
