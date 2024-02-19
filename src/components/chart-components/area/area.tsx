import EChartsReact from 'echarts-for-react';

import { PRIMARY_COLOR } from '@/config/color';
import { ECOption } from '@/types';

export type AreaProps = {
  xData: number[] | string[];
  seriesData: number[] | string[];
  color?: string;
  height?: number;
};
export const Area = ({
  xData,
  seriesData,
  color = PRIMARY_COLOR,
  height = 350,
}: AreaProps) => {
  const option: ECOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: [
      {
        left: '5%',
        right: '5%',
        bottom: '15%',
        height: 'auto',
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: seriesData,
        color,
        smooth: false,
        type: 'line',
        areaStyle: {
          color: color,
          opacity: 0.15,
        },
        symbol: 'none',
      },
    ],
  };

  return (
    <EChartsReact
      style={{
        height,
      }}
      option={option}
    />
  );
};
