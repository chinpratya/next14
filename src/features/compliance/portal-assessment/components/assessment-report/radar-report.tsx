import _ from 'lodash';

import { Radar } from '@charts/radar';

import { Graph, GraphMeta } from '../../types/report';

export type RadarReportProps = {
  graph?: Graph[];
  graphMeta?: GraphMeta[];
  loading?: boolean;
};

const COLORS = [
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

export const RadarReport = ({
  graph = [],
  graphMeta = [],
  loading,
}: RadarReportProps) => {
  const getReportSeriesData = () => {
    return graph.map((item) => ({
      name: item.title,
      value: _.map(
        item.value,
        (value) => +value.value.toFixed(2)
      ),
    }));
  };

  const seriesData = getReportSeriesData();

  const indicator = graphMeta?.map(
    (meta) => meta.name.split('.')[1]
  );

  return (
    <Radar
      name="Assessment Report"
      indicator={indicator}
      seriesData={seriesData}
      loading={loading}
      height="75vh"
      color={COLORS}
      radius={['0', '65%']}
      center={['50%', '50%']}
      fontSize={12}
    />
  );
};
