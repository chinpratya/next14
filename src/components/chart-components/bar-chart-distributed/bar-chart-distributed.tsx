import { Center } from '@mantine/core';
import { ResponsiveBar } from '@nivo/bar';
import { Typography } from 'antd';

import { tokens } from '@/lang';
import { ChartData } from '@/types/dashboard';
import { IntlMessage } from '@utilComponents/intl-message';

const convertChartDataToDistribution = (
  data: ChartData[] | undefined
) => {
  if (!data) return [];

  return data.map((item, index) => {
    return {
      key: item.id,
      [index + 1]: item.value,
    };
  });
};

export type BarChartDistributedProps = {
  data?: ChartData[];
  height?: number;
  axisLeft?: string | null;
  axisBottom?: string | null;
};

export const BarChartDistributed = ({
  data,
  height = 350,
  axisLeft,
  axisBottom,
}: BarChartDistributedProps) => {
  const total =
    data?.reduce((acc, item) => acc + item.value, 0) ?? 0;

  if (total === 0) {
    return (
      <Center h={height}>
        <Typography.Title level={4} type="secondary">
          <IntlMessage id={tokens.common.chart.noData} />
        </Typography.Title>
      </Center>
    );
  }

  const maxValue = Math.max(
    ...(data?.map((item) => item.value) ?? [])
  );
  const keys =
    data?.map((_, index) => (index + 1).toString()) ?? [];
  const colors = data?.map((item) => item.color) ?? [];

  const calPadding = (data: ChartData[] | undefined) => {
    if (!data) return 0;
    if (data.length >= 30) return 0.1;
    if (data.length >= 20) return 0.2;
    if (data.length >= 15) return 0.25;
    if (data.length >= 10) return 0.3;
    if (data.length >= 8) return 0.5;
    if (data.length >= 5) return 0.6;
    if (data.length >= 3) return 0.7;
    if (data.length >= 1) return 0.8;
    return 0.5;
  };

  const chartPadding = calPadding(data);

  return (
    <div
      style={{
        height: `${height}px`,
      }}
    >
      <ResponsiveBar
        data={convertChartDataToDistribution(data)}
        padding={chartPadding}
        margin={{
          top: 20,
          right: 40,
          bottom: axisBottom ? 120 : 100,
          left: axisLeft ? 60 : 40,
        }}
        maxValue={Math.floor(maxValue * 1.2)}
        keys={keys}
        indexBy="key"
        colors={colors}
        labelTextColor="#ffffff"
        axisLeft={{
          legend: axisLeft,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        axisBottom={{
          legend: axisBottom,
          legendPosition: 'middle',
          legendOffset: 100,
          renderTick: (tick) => {
            return (
              <g
                transform={`translate(${tick.x},${tick.y})`}
              >
                <foreignObject
                  x={-85}
                  y={0}
                  width={80}
                  height={60}
                  transform="rotate(-45)"
                >
                  <div
                    style={{
                      width: '80px',
                      wordWrap: 'break-word',
                      textAlign: 'center',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {tick.value}
                  </div>
                </foreignObject>
              </g>
            );
          },
        }}
      />
    </div>
  );
};
