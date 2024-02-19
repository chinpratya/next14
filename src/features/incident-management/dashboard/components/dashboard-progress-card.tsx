import { Flex } from '@mantine/core';
import { ResponsiveBar } from '@nivo/bar';
import { Divider, Progress, Typography } from 'antd';

// eslint-disable-next-line no-restricted-imports
import {
  DashboardByTimeResponse,
  DashboardCountResponse,
} from '@/features/incident-management/dashboard/types';

type ProgressCardProps = {
  value?: DashboardByTimeResponse;
  count?: DashboardCountResponse;
};

export const ProgressCard = ({
  value,
  count,
}: ProgressCardProps) => {
  const valHigh = value?.data
    ?.map((val) => val.high)
    .reduce((partialSum, a) => partialSum + a, 0);

  const valMeium = value?.data
    ?.map((val) => val.medium)
    .reduce((partialSum, a) => partialSum + a, 0);

  const valLow = value?.data
    ?.map((val) => val.low)
    .reduce((partialSum, a) => partialSum + a, 0);
  const data = [
    {
      severity: 'จำนวน',
      high: valHigh || 0,
      highColor: '#F04438',
      medium: valMeium || 0,
      mediumColor: '#FFCA3A',
      low: valLow || 0,
      lowColor: '#06AED4',
    },
  ];

  const ProgressData = {
    close: count?.data?.completeCount ?? 0,
    open: count?.data?.total ?? 0 ?? 0,
  };
  const percentage = () => {
    const val =
      ((ProgressData.close || 0) /
        (ProgressData.open || 0)) *
      100;

    if (val > 100) {
      return 100;
    } else {
      return Math.round(val);
    }
  };

  return (
    <>
      <div style={{ paddingTop: 30 }}>
        <Typography>ระดับความรุนแรง</Typography>
        <div
          style={{
            width: '100%',
            height: '10px',
          }}
        >
          <ResponsiveBar
            data={data ?? []}
            keys={['high', 'medium', 'low']}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            indexBy={`severity`}
            padding={0}
            layout="horizontal"
            indexScale={{ type: 'band', round: true }}
            colors={['#F04438', '#FFCA3A', '#06AED4']}
            axisTop={null}
            axisRight={null}
            enableLabel={false}
          />
        </div>
        <Flex
          gap={5}
          style={{
            paddingTop: '20px',
          }}
        >
          <>
            <div
              style={{
                width: 4,
                height: 15,
                backgroundColor: '#F04438',
              }}
            ></div>
            <Typography
              style={{ width: '30%', fontSize: 12 }}
            >
              สูง ({valHigh})
            </Typography>
          </>

          <>
            <div
              style={{
                width: 4,
                height: 15,
                backgroundColor: '#FFCA3A',
              }}
            ></div>
            <Typography
              style={{ width: '30%', fontSize: 12 }}
            >
              ปานกลาง ({valMeium})
            </Typography>
          </>

          <>
            <div
              style={{
                width: 4,
                height: 15,
                backgroundColor: '#06AED4',
              }}
            ></div>
            <Typography
              style={{ width: '30%', fontSize: 12 }}
            >
              ต่ำ ({valLow})
            </Typography>
          </>
        </Flex>
        <Typography style={{ paddingTop: 30 }}>
          สถานะ ({percentage()}%)
        </Typography>

        <Progress
          status="success"
          percent={percentage()}
          showInfo={false}
        />
        <Flex gap={10} style={{ paddingTop: 10 }}>
          <div
            style={{
              width: 4,
              height: 15,
              backgroundColor: '#8AC926',
            }}
          ></div>
          <Typography
            style={{ width: '50%', fontSize: 12 }}
          >
            {' '}
            เสร็จสิ้น ({ProgressData.close})
          </Typography>
          <div
            style={{
              width: 4,
              height: 15,
              backgroundColor: '#D9D9D9',
            }}
          ></div>
          <Typography
            style={{ width: '50%', fontSize: 12 }}
          >
            {' '}
            กำลังดำเนินงาน ({ProgressData.open})
          </Typography>
        </Flex>
        <Divider />
        <Typography>
          เวลาโดยเฉลี่ยของระยะเวลาในการตอบสนอง
        </Typography>
        <Typography>
          <span style={{ fontWeight: 700, fontSize: 22 }}>
            4
          </span>{' '}
          นาที
        </Typography>
        <Typography
          style={{
            paddingTop: 20,
          }}
        >
          เวลาโดยเฉลี่ยของระยะเวลาในการดำเนินงาน
        </Typography>
        <Typography>
          <span style={{ fontWeight: 700, fontSize: 22 }}>
            11
          </span>{' '}
          นาที
        </Typography>
      </div>
    </>
  );
};
