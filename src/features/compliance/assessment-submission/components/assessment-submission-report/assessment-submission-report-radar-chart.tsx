import { Radar, SeriesData } from '@charts/radar';

import {
  GraphAssessment,
  GraphMetaAssessment,
} from '../../types';

export type RadarChartReportProps = {
  graph?: GraphAssessment[];
  graphMeta?: GraphMetaAssessment[];
  loading?: boolean;
  height: string;
  reportType?: string;
};

export const RadarChartReport = ({
  graph = [],
  graphMeta = [],
  loading,
  height,
}: RadarChartReportProps) => {
  const getReportSeriesData = (): SeriesData[] => {
    return graph.map((item) => ({
      name: item.title,
      value: item.value.map((value) => {
        return +value.value.toFixed(2);
      }),
    }));
  };

  const seriesData = getReportSeriesData();

  const indicator = graphMeta?.map(
    (meta) => meta.name.split('.')[1]
  );
  const colors = [
    '#6F42C1',
    '#60C0E8',
    '#5FCE89',
    '#F6C75C',
    '#D9345C',
    '#49A11E',
    '#FD7E14',
    '#87C5E5',
    '#C74343',
    '#1890ff',
    '#2f54eb',
    '#722ed1',
    '#faad14',
    '#fadb14',
    '#a0d911',
    '#52c41a',
    '#13c2c2',
    '#f5222d',
    '#fa541c',
    '#fa8c16',
    '#eb2f96',
  ];
  return (
    <Radar
      name="Assessment Report"
      indicator={indicator}
      seriesData={seriesData}
      loading={loading}
      height={height}
      color={colors}
      center={['50%', '45%']}
      radius={['0%', '75%']}
      fontSize={12}
    />
  );
};
