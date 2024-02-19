import { useEffect, useState } from 'react';

import { convertBytesToSize } from '@/utils';

import { COLORS } from '../../../shared/constant/color';
import { Option } from '../../types';
import { ReportPieChart } from '../report-pie-chart';

type ReportIndiceEventSizeChartProps = {
  data: Option[];
};

type DataChart = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export const ReportIndiceEventSizeChart = ({
  data,
}: ReportIndiceEventSizeChartProps) => {
  const [state, setState] = useState<{
    dataChart: DataChart[];
    total: number;
    unit?: string;
  }>({
    dataChart: [],
    total: 0,
  });

  useEffect(() => {
    if (data) {
      const total = data.reduce(
        (a, b) => a + (b.value as number),
        0
      );

      const values = data.map(
        ({ label, value }, index) => ({
          id: label,
          label,
          value: ((value as number) / total) * 100,
          color: COLORS[index],
        })
      );

      const unit =
        convertBytesToSize(total).split(' ')?.[1] ??
        undefined;

      setState({
        dataChart: values,
        total,
        unit,
      });
    }
  }, [data]);

  return (
    <ReportPieChart
      data={state.dataChart}
      innerRadius={0.7}
      isShowTotal
      totalValue={`${
        convertBytesToSize(state.total).split(' ')[0]
      }`}
      totalUnit={state.unit}
    />
  );
};
