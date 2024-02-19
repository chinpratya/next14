import { Flex } from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';

// eslint-disable-next-line no-restricted-imports
import { DashboardByTimeResponse } from '@/features/incident-management/dashboard/types';

type DashboardViolenceChartProps = {
  value?: DashboardByTimeResponse;
};

export const DashboardViolenceChart = ({
  value,
}: DashboardViolenceChartProps) => {
  const valHigh = value?.data
    ?.map((val) => val.high)
    .reduce((partialSum, a) => partialSum + a, 0);

  const valMeium = value?.data
    ?.map((val) => val.medium)
    .reduce((partialSum, a) => partialSum + a, 0);

  const valLow = value?.data
    ?.map((val) => val.low)
    .reduce((partialSum, a) => partialSum + a, 0);

  const sum =
    (valHigh || 0) + (valMeium || 0) + (valLow || 0);
  const data = [
    {
      id: 'high',
      label: 'สูง',
      value: valHigh,
      color: '#F04438',
    },
    {
      id: 'medium',
      label: 'ปานกลาง',
      value: valMeium,
      color: '#F9C74F',
    },
    {
      id: 'low',
      label: 'ต่ำ',
      value: valLow,
      color: '#06AED4',
    },
  ];
  const percentage = (e: number) => {
    const val = ((e || 0) / (sum || 0)) * 100;

    if (val > 100) {
      return 100;
    } else {
      return Math.round(val);
    }
  };
  return (
    <Flex align="center" justify="center">
      <div
        style={{
          width: 200,
          height: 350,
        }}
      >
        <ResponsivePie
          data={data}
          margin={{
            top: 0,
            right: 0,
            bottom: 90,
            left: 0,
          }}
          sortByValue={true}
          innerRadius={0.4}
          fit={false}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabel={(e) =>
            e.id + ' (' + e.value + ')'
          }
          arcLinkLabelsSkipAngle={1}
          arcLinkLabelsThickness={2}
          colors={data.map((d) => d.color)}
          arcLabelsTextColor="#ffffff"
          arcLabel={(e) => '' + percentage(e.value) + '%'}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 40,
              itemWidth: 30,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'top-to-bottom',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              data: data.map((cur) => ({
                id: cur.id,
                label: cur.label,
                color: cur.color,
              })),
            },
          ]}
        />
      </div>
    </Flex>
  );
};
