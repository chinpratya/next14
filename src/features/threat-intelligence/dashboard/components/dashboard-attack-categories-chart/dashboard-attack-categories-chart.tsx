import { css } from '@emotion/css';
import { ResponsiveBar } from '@nivo/bar';
import { Card, Typography } from 'antd';

import {
  formatNumber,
  formatNumberWithCommas,
} from '@/utils';

import data from './mock-data.json';

export const DashboardAttackCategoriesChart = () => {
  return (
    <Card
      title="Top 10 Attack Categories  (1 Months)"
      className="h-100"
    >
      <div
        className={css`
          width: 100%;
          height: 600px;
        `}
      >
        <ResponsiveBar
          data={[...data].reverse()}
          keys={['event']}
          indexBy="name"
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 100,
          }}
          padding={0.4}
          layout="horizontal"
          colors={'#8d6eff'}
          enableGridY={false}
          enableLabel={false}
          enableGridX
          axisBottom={{
            tickSize: 0,
            format: (value) => formatNumber(value),
          }}
          tooltip={(bar) => (
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
                  background-color: ${bar.color};
                `}
              />
              {bar.indexValue}
              <span className="mx-2">-</span>
              <Typography.Text strong>
                {formatNumberWithCommas(bar.value)}
              </Typography.Text>
            </div>
          )}
        />
      </div>
    </Card>
  );
};
