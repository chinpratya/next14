import { Flex } from '@mantine/core';
import { Progress, Typography } from 'antd';

// eslint-disable-next-line no-restricted-imports
import { DashboardListOfRequestResponse } from '@/features/incident-management/dashboard/types';

type DashboardCatagoryProgressProps = {
  data: DashboardListOfRequestResponse;
};

export const DashboardCatagoryProgress = ({
  data,
}: DashboardCatagoryProgressProps) => {
  const datas = data?.data?.status;
  const cyber = datas?.filter(
    (data) => data.key === 'cyber_security'
  );
  const physical = datas?.filter(
    (data) => data.key === 'physical_security'
  );
  const privacy = datas?.filter(
    (data) => data.key === 'privacy_management'
  );

  return (
    <>
      <div style={{ paddingTop: 30 }}></div>
      <ProgressBar
        close={
          privacy
            ?.map((data) => data.closed)
            .reduce(
              (partialSum, a) =>
                (partialSum ?? 0) + (a ?? 0),
              0
            ) ?? 0
        }
        title="Privacy Management"
        color={'#EA4C86'}
        open={
          privacy
            ?.map((data) => data.opened)
            .reduce(
              (partialSum, a) =>
                (partialSum ?? 0) + (a ?? 0),
              0
            ) ?? 0
        }
      />

      <ProgressBar
        close={physical
          ?.map((data) => data.closed)
          .reduce(
            (partialSum, a) =>
              (partialSum ?? 0) + (a ?? 0),
            0
          )}
        open={physical
          ?.map((data) => data.opened)
          .reduce(
            (partialSum, a) =>
              (partialSum ?? 0) + (a ?? 0),
            0
          )}
        title="Physical Security"
        color={'#FF7722'}
      />

      <ProgressBar
        close={cyber
          ?.map((data) => data.closed)
          .reduce(
            (partialSum, a) =>
              (partialSum ?? 0) + (a ?? 0),
            0
          )}
        open={cyber
          ?.map((data) => data.opened)
          .reduce(
            (partialSum, a) =>
              (partialSum ?? 0) + (a ?? 0),
            0
          )}
        title="Cyber Security"
        color={'#704AFF'}
      />
    </>
  );
};
type ProgressBarProps = {
  color?: string;
  title?: string;
  open?: number;
  close?: number;
};
const ProgressBar = ({
  color,
  title,
  open,
  close,
}: ProgressBarProps) => {
  const percentage = () => {
    const val = ((close || 0) / (open || 0)) * 100;

    if (val > 100) {
      return 100;
    }
    if (Number.isNaN(val)) {
      return 0;
    } else {
      return Math.ceil(val);
    }
  };

  return (
    <>
      <div
        style={{
          paddingBottom: 30,
        }}
      >
        <Typography>
          {title}({percentage()}%)
        </Typography>
        <Progress
          percent={percentage()}
          showInfo={false}
          strokeColor={color}
        />

        <Flex
          gap={5}
          style={{
            paddingTop: 10,
          }}
        >
          <>
            <div
              style={{
                width: 4,
                height: 15,
                backgroundColor: `${color}`,
              }}
            ></div>
            <Typography
              style={{ width: '50%', fontSize: 12 }}
            >
              เสร็จสิ้น ({close})
            </Typography>
          </>

          <>
            <div
              style={{
                width: 4,
                height: 15,
                backgroundColor: '#F5F5F5',
              }}
            ></div>
            <Typography
              style={{ width: '50%', fontSize: 12 }}
            >
              กำลังดำเนินงาน ({open})
            </Typography>
          </>
        </Flex>
      </div>
    </>
  );
};
