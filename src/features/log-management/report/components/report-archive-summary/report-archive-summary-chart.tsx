import { useEffect, useState } from 'react';

import { COLORS } from '../../../../siem/shared/constant/color';
import { Option } from '../../types';
import { ReportPieChart } from '../report-pie-chart';

type ReportArchiveSummaryProps = {
  data: Option[];
};

type DataChart = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export const ReportArchiveSummaryChart = ({
  data,
}: ReportArchiveSummaryProps) => {
  const [state, setState] = useState<{
    dataChart: DataChart[];
    total: number;
  }>({ dataChart: [], total: 0 });

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
      setState({ dataChart: values, total });
    }
  }, [data]);

  return (
    <ReportPieChart
      data={state.dataChart}
      innerRadius={0.7}
      isShowTotal
      totalValue={`${state.total}`}
    />
  );
};
