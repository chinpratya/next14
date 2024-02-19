import { css } from '@emotion/css';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';

import { COLORS } from '../../../shared/constant/color';

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
  colors?: string[];
};

export const ReportPieChart = ({
  data,
  innerRadius = 0,
  isShowTotal,
  totalValue,
  totalUnit,
  colors = COLORS,
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
        colors={colors}
        innerRadius={innerRadius}
        tooltip={({ datum }) => (
          <div
            className={css`
              display: flex;
              align-items: center;
              padding: 5px;
              border-radius: 4px;
              background-color: #fff;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px
                8px 0px;
            `}
          >
            <span
              className={css`
                display: block;
                margin-right: 4px;
                width: 13px;
                height: 13px;
                border-radius: 4px;
                background-color: ${datum.color};
              `}
            />
            {datum.label}
            <span className="mx-2">-</span>
            <Typography.Text strong>
              {datum.formattedValue}
            </Typography.Text>
          </div>
        )}
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
