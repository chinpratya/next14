import { ResponsiveBar } from '@nivo/bar';
import { Col, Row } from 'antd';
// import dayjs from 'dayjs';

// eslint-disable-next-line no-restricted-imports
import { DashboardListOfRequestResponse } from '@/features/incident-management/dashboard/types';
import { getColLayout } from '@/utils';

// import { DashboardCatagory } from './dashboard-catagory';
type DashboardCatagoryChartProps = {
  data: DashboardListOfRequestResponse;
};

export const DashboardCatagoryChart = ({
  data,
}: DashboardCatagoryChartProps) => {
  const datas = data?.data?.event_cateogry;

  return (
    <>
      <Row>
        <Col {...getColLayout(24)}>
          <div
            style={{
              width: '100%',
              height: '50vh',
            }}
          >
            <ResponsiveBar
              data={datas ?? []}
              keys={[
                'privacy_management',
                'physical_security',
                'cyber_security',
              ]}
              indexBy="key"
              margin={{
                top: 40,
                right: 0,
                bottom: 90,
                left: 40,
              }}
              enableLabel={false}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={['#EA4C86', '#FF7722', '#704AFF']}
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
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: null,
                legendPosition: 'middle',
                legendOffset: -40,
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
