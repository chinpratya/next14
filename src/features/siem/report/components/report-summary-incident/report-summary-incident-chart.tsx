import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Option } from '../../types';
import { ReportPieChart } from '../report-pie-chart';

export type DataSource = Option & {
  key?: string;
  color?: string;
};

type ReportSummaryIncidentChartProps = {
  data: DataSource[];
};

type DataChart = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export const ReportSummaryIncidentChart = ({
  data,
}: ReportSummaryIncidentChartProps) => {
  const { t } = useTranslation();

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
        ({ label, value, color, key }) => ({
          id: key as string,
          label: t(label) as string,
          value: ((value as number) / total) * 100,
          color: color as string,
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
      colors={[
        '#E52916',
        '#FA8C16',
        '#FFC542',
        '#0DD182',
      ]}
    />
  );
};
