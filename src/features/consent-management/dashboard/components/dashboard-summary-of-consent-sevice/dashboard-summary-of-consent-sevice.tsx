import { Card } from 'antd';
import EChartsReact from 'echarts-for-react';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDashboardAccept } from '../../api/list-dashboard-accept';

type DashboardSummaryOfConsentServiceProps = {
  selectedDuration: string;
};

export const DashboardSummaryOfConsentService = ({
  selectedDuration,
}: DashboardSummaryOfConsentServiceProps) => {
  const { data, isLoading, isError } =
    useListDashboardAccept({
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
        dataLabel.push(item.name);
        accept.push(item.acceptCount);
        reject.push(item.rejectCount);
        mix.push(item.mixCount);
      });

      setDataSource({ dataLabel, accept, reject, mix });
    }
  }, [data]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.dashboard.summaryOfConsentService" />
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
                name: 'กลุ่มกิจกรรม',
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
          opts={{ renderer: 'svg' }}
          showLoading={isLoading}
        />
      </Card>
    </FallbackError>
  );
};
