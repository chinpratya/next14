import EChartsReact from 'echarts-for-react';

import { ECOption } from '@/types';

export const Line = (props: ECOption) => {
  const option: ECOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      orient: 'horizontal',
      right: 'center',
      top: 'bottom',
      icon: 'rect',
      type: 'scroll',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
    },
    ...props,
  };

  return <EChartsReact option={option} />;
};
