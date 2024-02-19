import { Skeleton } from 'antd';
import EChartsReact from 'echarts-for-react';

import { ECOption } from '@/types';
import { NoDataCard } from '@components/no-data-card';

export type SeriesData = {
  value: number[];
  name: string;
};

export type RadarProps = {
  name: string;
  loading?: boolean;
  max?: number;
  width?: string;
  height?: string;
  indicator?: string[];
  seriesData?: SeriesData[];
  color: string[];
  center?: string[];
  radius?: string[];
  show?: boolean;
  fontSize?: number;
  tooltip?: boolean;
};

export const Radar = ({
  name,
  max = 100,
  loading = false,
  width = '100%',
  height = '550px',
  indicator = [],
  seriesData = [],
  color,
  center = ['50%', '60%'],
  radius = ['0%', '90%'],
  show = true,
  tooltip = true,
  fontSize = 16,
}: RadarProps) => {
  if (loading) return <Skeleton active />;

  if (
    indicator?.length === 0 ||
    seriesData?.length === 0
  ) {
    return <NoDataCard />;
  }

  const legendData: string[] = seriesData.map(
    (data) => data.name
  );

  const option: ECOption = {
    legend: {
      show: show,
      bottom: 0,
      data: legendData,
      textStyle: {
        color: '#000',
      },
    },
    color,
    textStyle: {
      fontSize: fontSize,
      color: '#455560',
    },
    radar: {
      indicator: indicator?.map((name) => ({
        name,
        max,
      })),
      radius: radius,
      scale: true,
      center: center,
    },
    series: [
      {
        name,
        type: 'radar',
        data: seriesData?.map((series) => ({
          ...series,
          areaStyle: {
            opacity: 0.05,
          },
        })),
        symbolSize: 0,
      },
    ],
    tooltip: {
      show: tooltip,
    },
  };

  return (
    <EChartsReact
      option={option}
      style={{ height, width }}
      notMerge
      lazyUpdate
      opts={{ renderer: 'svg' }}
    />
  );
};
