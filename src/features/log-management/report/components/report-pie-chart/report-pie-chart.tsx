import { css } from '@emotion/css';
import { ResponsivePie } from '@nivo/pie';

import { constant } from '@/features/siem';

import { ReportPieTotalInformation } from './report-pie-total-information';

export type DataPie = {
  id: string;
  label: string;
  value: number;
  color: string;
};

type ReportPieChartProps = {
  data?: DataPie[];
  innerRadius?: number;
  isShowTotal?: boolean;
  totalValue?: string;
  totalUnit?: string;
};

export const ReportPieChart = ({
  data,
  innerRadius = 0,
  isShowTotal,
  totalValue,
  totalUnit,
}: ReportPieChartProps) => {
  return (
    <div
      className={css`
        position: relative;
        margin: 0 auto;
        width: 190px;
        height: 190px;
      `}
    >
      <ResponsivePie
        data={data ?? []}
        colors={constant.color}
        innerRadius={innerRadius}
        valueFormat={(value) =>
          `${
            value < 1
              ? value.toFixed(1)
              : value.toFixed(0)
          }%`
        }
        enableArcLinkLabels={false}
        arcLabelsTextColor="#fff"
        arcLabelsSkipAngle={20}
        sortByValue
      />
      {isShowTotal && (
        <ReportPieTotalInformation
          totalValue={totalValue}
          totalUnit={totalUnit}
        />
      )}
    </div>
  );
};
