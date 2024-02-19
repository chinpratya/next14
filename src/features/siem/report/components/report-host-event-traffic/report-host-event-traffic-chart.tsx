import { css } from '@emotion/css';

import { ReportHostEventTraffic } from '../../types';
import { ReportBarChart } from '../report-bar-chart';

type ReportHostEventTrafficChartProps = {
  data?: ReportHostEventTraffic[];
};

export const ReportHostEventTrafficChart = ({
  data,
}: ReportHostEventTrafficChartProps) => {
  return (
    <div
      className={css`
        width: 100%;
        height: 400px;
      `}
    >
      <ReportBarChart
        data={data ?? []}
        keys={['event']}
        indexBy="hostname"
        colors={['#3e79f7']}
        isFormatNumber
        axisBottomLimit
        axisBottomRotate={40}
        marginBottom={65}
        padding={0.2}
      />
    </div>
  );
};
