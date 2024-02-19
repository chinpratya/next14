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
  marginRight?: number;
  padding?: number;
  isSize?: boolean;
  axisLeftLegendOffset?: number;
  axisLeftLegend?: string;
  axisBottomLegend?: string;
};

export const ReportBarChart = ({
  isFormatNumber,
  axisBottomRotate,
  marginBottom = 30,
  axisBottomLimit,
  marginLeft = 50,
  marginRight = 0,
  axisLeftLegendOffset = 0,
  axisLeftLegend,
  axisBottomLegend,
  isSize,
  colors,
  ...props
}: ReportBarChartProps) => {
  const theme = {
    axis: {
      ticks: {
        text: {
          fill: '#6a7c88',
        },
      },
      legend: {
        text: {
          fill: '#000',
        },
      },
    },
  };

  return (
    <ResponsiveBar
      margin={{
        top: 10,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      colorBy="indexValue"
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
              : formatNumberWithCommas(bar.value)}
          </Typography.Text>
        </div>
      )}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 10,
        legend: axisLeftLegend,
        legendPosition: 'middle',
        legendOffset: axisLeftLegendOffset,
        format: (value) => {
          if (isSize) return convertBytesToSize(value);
          return formatNumber(value);
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
        legend: axisBottomLegend,
      }}
      theme={theme}
      colors={colors}
      {...props}
    />
  );
};
