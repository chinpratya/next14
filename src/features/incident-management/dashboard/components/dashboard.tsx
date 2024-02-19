import { ResponsiveBar } from '@nivo/bar';
import { Col, Row } from 'antd';

import { getColLayout } from '@/utils';

import { DashboardByTimeResponse } from '../types';

type DashboardProps = {
  data: DashboardByTimeResponse;
};

export const Dashboard = ({ data }: DashboardProps) => {
  const datas = data?.data?.map((data) => data) ?? [];
  return (
    <>
      <Row>
        <Col {...getColLayout(24)}>
          <div
            style={{
              width: '100%',
              height: '40vh',
              maxHeight: '50vh',
            }}
          >
            <ResponsiveBar
              data={datas}
              keys={['high', 'medium', 'low']}
              indexBy="key"
              margin={{
                top: 40,
                right: 0,
                bottom: 60,
                left: 40,
              }}
              enableLabel={false}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={['#F04438', '#FFCA3A', '#06AED4']}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              enableGridX={true}
              legends={[]}
              role="application"
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
