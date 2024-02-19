import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import { Flex } from '@mantine/core';
import { Card, Divider, Space, Typography } from 'antd';
import React from 'react';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { SpParagraph } from '@/components/share-components/sp-paragraph';
import { type RequestDetail } from '@/features/incident-management';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// React Flip Clock Document:
// https://github.com/sLeeNguyen/react-flip-clock-countdown

type countTimeProps = {
  endTime?: string;
  status: string;
  timeDelta: string;
  iscompleted: boolean;
};

const CountUpTimerClock = ({
  endTime,
  status,
  timeDelta,
  iscompleted,
}: countTimeProps) => {
  const [statusTime, setStatusTime] =
    React.useState<string>('');
  const [startTime] = React.useState(
    new Date(endTime as string)
  );
  const [elapsedTime, setElapsedTime] = React.useState(0);
  React.useEffect(() => {
    setStatusTime(status);
    if (statusTime === 'closed') {
      const deltaTime = new Date(timeDelta as string);
      const timeDifference =
        startTime.getTime() - deltaTime.getTime();
      setElapsedTime(timeDifference);
    } else {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference =
          currentTime.getTime() - startTime.getTime();
        setElapsedTime(timeDifference);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, status, statusTime, timeDelta]);

  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = () => {
      if (iscompleted === true) {
        return Math.floor(time / (1000 * 60 * 60));
      } else {
        return Math.floor((time / (1000 * 60 * 60)) % 60);
      }
    };
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <>
        <Flex direction="row" justify="center">
          <TimeBox time={days} label="วัน" />{' '}
          <span
            style={{
              paddingTop: 5,
              paddingRight: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            :
          </span>
          <TimeBox time={hours()} label="ชั่วโมง" />
          <span
            style={{
              paddingTop: 5,
              paddingRight: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            :
          </span>
          <TimeBox time={minutes} label="นาที" />
          <span
            style={{
              paddingTop: 5,
              paddingRight: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            :
          </span>
          <TimeBox time={seconds} label="วินาที" />
        </Flex>
      </>
    );
  };

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

type IncidentExpireCountdownTimeProps = {
  data?: RequestDetail;
  currentState?: number;
};

export const IncidentExpireCountdownTime = ({
  data,
}: IncidentExpireCountdownTimeProps) => {
  const [iscompleted, setiscompleted] =
    React.useState<boolean>(false);
  const [timeDelta, setTimeDelta] =
    React.useState<string>();

  React.useEffect(() => {
    setTimeDelta(data?.closed_dt);
  }, [data?.closed_dt]);

  return (
    <Card
      title={
        <>
          <Flex direction="row" justify="space-between">
            <Typography>เวลาคงเหลือ</Typography>
            {iscompleted === true ||
            data?.status === 'closed' ? (
              <>
                {' '}
                <ShowTagStatus
                  status={data?.status}
                  items={[
                    {
                      label: 'เลยกำหนด',
                      key: 'opened',
                      color: '#FC5555',
                    },
                    {
                      label: 'เสร็จสิ้น',
                      key: 'closed',
                      color: '#8BC926',
                    },
                  ]}
                />
              </>
            ) : null}
          </Flex>
          <Divider
            style={{
              padding: -20,
              margin: 10,
            }}
          />
        </>
      }
    >
      {iscompleted === false ? (
        <>
          {data?.status === 'closed' ? (
            <>
              <CountUpTimerClock
                endTime={data?.limitExtraDt as string}
                status={data?.status}
                timeDelta={timeDelta as string}
                iscompleted={iscompleted}
              />
            </>
          ) : (
            <>
              <FlipClockCountdown
                to={data?.limitExtraDt as string}
                labels={[
                  'วัน',
                  'ชั่วโมง',
                  'นาที',
                  'วินาที',
                ]}
                labelStyle={{
                  color: '#000',
                  fontSize: 14,
                }}
                digitBlockStyle={{
                  width: 30,
                  height: 50,
                  fontSize: 30,
                }}
                onComplete={() => setiscompleted(true)}
              />
            </>
          )}
        </>
      ) : (
        <>
          {' '}
          <CountUpTimerClock
            endTime={data?.limitExtraDt as string}
            status={data?.status || ''}
            timeDelta={timeDelta as string}
            iscompleted={iscompleted}
          />
        </>
      )}

      <Space className="mt-3">
        <SpParagraph title="สิ้นสุดภายใน" direction="row">
          {data?.limitExtraDt}
        </SpParagraph>
      </Space>
    </Card>
  );
};

type BoxClolorProps = {
  time?: number;
  label?: string;
};
const TimeBox = ({ time, label }: BoxClolorProps) => {
  return (
    <div
      style={{
        width: 200,
      }}
    >
      <Flex direction="column" align="center">
        <Space
          style={{
            width: 50,
            height: 50,
            borderRadius: 6,
            borderWidth: 4,
            padding: 0,
            alignContent: 'center',
            justifyContent: 'center',
            border: `2px solid #DE4436`,
            fontFamily: 'Iceberg',
            fontSize: 23,
            fontWeight: 500,
            color: `#DE4436`,
            marginRight: 10,
          }}
        >
          {time}
        </Space>
        <Typography
          style={{
            fontSize: 14,
            alignContent: 'center',
            justifyContent: 'center',
            paddingRight: 10,
          }}
        >
          {label}
        </Typography>
      </Flex>
    </div>
  );
};
