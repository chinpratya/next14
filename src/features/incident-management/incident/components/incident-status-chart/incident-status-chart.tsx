import { Flex } from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { Card, Divider, Typography } from 'antd';
export const IncidentStatusChart = () => {
  const data = [
    {
      id: 'open',
      label: 'OPER',
      value: 5,
      color: '#3E79F7',
    },
    {
      id: 'inprogress',
      label: 'INPROGRESS',
      value: 2,
      color: '#F79009',
    },
    {
      id: 'close',
      label: 'CLOSE',
      value: 10,
      color: '#15B79E',
    },
  ];

  return (
    <Card
      title={
        <>
          <Typography style={{ marginBottom: -10 }}>
            {' '}
            สถานะ
          </Typography>
          <Divider />
        </>
      }
      style={{
        height: 300,
      }}
    >
      <Flex align="center" justify="center">
        <div
          style={{
            width: 400,
            height: 250,
            marginTop: -20,
          }}
        >
          <ResponsivePie
            data={data}
            margin={{
              top: 0,
              right: 140,
              bottom: 70,
              left: 0,
            }}
            sortByValue={true}
            innerRadius={0.5}
            fit={false}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0]],
            }}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={1}
            arcLinkLabelsThickness={2}
            colors={data.map((d) => d.color)}
            arcLabelsTextColor="#ffffff"
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                symbolSpacing: 10,
                itemsSpacing: 25,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 20,
                symbolShape: 'square',
                data: data.map((cur) => ({
                  id: cur.id,
                  label: cur.label + ` (${cur.value}%)`,
                  color: cur.color,
                })),
              },
            ]}
          />
        </div>
      </Flex>
    </Card>
  );
};
