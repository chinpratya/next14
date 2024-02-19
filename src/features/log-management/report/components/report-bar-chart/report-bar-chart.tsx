import { css } from '@emotion/css';
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import { Typography } from 'antd';

import {
  convertBytesToSize,
  formatNumber,
  formatNumberWithCommas,
} from '@/utils';

type ReportBarChartProps = {
  data: BarDatum[];
  keys: string[];
  colors?: string[];
  indexBy: string;
  isFormatNumber?: boolean;
  axisBottomRotate?: number;
  axisBottomLimit?: boolean;
  marginBottom?: number;
  marginLeft?: number;
  padding?: number;
  isSize?: boolean;
};

export const ReportBarChart = ({
  isFormatNumber,
  axisBottomRotate,
  marginBottom = 30,
  axisBottomLimit,
  marginLeft = 50,
  isSize,
  ...props
}: ReportBarChartProps) => {
  return (
    <ResponsiveBar
      margin={{
        top: 10,
        right: 0,
        bottom: marginBottom,
        left: marginLeft,
      }}
      colorBy="id"
      labelSkipWidth={20}
      labelSkipHeight={20}
      labelTextColor="#ffffff"
      label={(data) => {
        if (isFormatNumber)
          return `${formatNumber(data.value as number)}`;
        return `${convertBytesToSize(
          data.value as number
        )}`;
      }}
      tooltip={(bar) => (
        <div
          className={css`
            display: flex;
            align-items: center;
            padding: 5px;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px
              0px;
          `}
        >
          <span
            className={css`
              display: block;
              margin-right: 4px;
              width: 13px;
              height: 13px;
              border-radius: 4px;
              background-color: ${bar.color};
            `}
          />
          {bar.indexValue}
          <span className="mx-2">-</span>
          <Typography.Text strong>
            {isSize
              ? convertBytesToSize(bar.value)
              : isFormatNumber
              ? formatNumberWithCommas(bar.value)
              : bar.value}
          </Typography.Text>
        </div>
      )}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 10,
        format: (value) => {
          if (isSize) {
            return convertBytesToSize(value);
          } else if (isFormatNumber) {
            return formatNumber(value);
          }
          return value;
        },
      }}
      axisBottom={{
        tickRotation: axisBottomRotate ?? 0,
        tickPadding: 10,
        format: (value) => {
          if (axisBottomLimit && value.length > 10) {
            return value.substring(0, 10) + '...';
          }
          return value;
        },
      }}
      {...props}
    />
  );
};
