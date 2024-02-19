import { css } from '@emotion/css';
import { ResponsivePie } from '@nivo/pie';
import { Card, Typography } from 'antd';

import {
  formatNumber,
  formatNumberWithCommas,
} from '@/utils';

import { color } from '../../../shared';

import { DashboardTypesOfIndicatorsList } from './dashboard-types-of-indicators-list';
import data from './mock-data.json';

export const DashboardTypesOfIndicators = () => {
  return (
    <Card title="Types of indicators" className="h-100">
      <div
        className={css`
          position: relative;
          margin: 0 auto;
          width: 300px;
          height: 300px;
          margin-top: 16px;
        `}
      >
        <ResponsivePie
          data={data ?? []}
          colors={color.list}
          valueFormat={(value) => formatNumber(value)}
          enableArcLinkLabels={false}
          arcLabelsTextColor="#fff"
          arcLabelsSkipAngle={20}
          sortByValue
          tooltip={(value) => (
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
                  background-color: ${value.datum.color};
                `}
              />
              {value.datum.label}
              <span className="mx-2">-</span>
              <Typography.Text strong>
                {formatNumberWithCommas(
                  value.datum.value
                )}
              </Typography.Text>
            </div>
          )}
        />
      </div>
      <DashboardTypesOfIndicatorsList
        data={data.map((item, index) => ({
          ...item,
          color: color.list[index],
        }))}
      />
    </Card>
  );
};
