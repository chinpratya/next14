import { Flex } from '@mantine/core';
import { Divider, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { NoDataCard } from '@components/no-data-card';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { listRequest } from '../../../incident-management/incident-smart-city';
import { RequestResponse } from '../../../incident-management/incident-smart-city';
export const DashboardEventNewUpdate = () => {
  const [newEvent, setNewEvent] =
    useState<RequestResponse>();
  const router = useRouter();
  const statusItems = [
    {
      label: 'เปิด',
      key: 'opened',
      color: '#4CB543',
    },
    {
      label: 'กำลังดำเนินงาน',
      key: 'inprogress',
      color: '#FFCA39',
    },
    {
      label: 'ปิด',
      key: 'closed',
      color: '#F04437',
    },
    {
      label: 'กำลังดำเนินงาน',
      key: 'pending',
      color: '#FFCA39',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const data: Promise<RequestResponse> = listRequest(
        {}
      );
      data.then((response: RequestResponse) => {
        setNewEvent(response);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FallbackError isError={false}>
        <div
          style={{
            paddingTop: 0,
            maxHeight: 600,
            overflowY: 'scroll',
          }}
        >
          <Flex justify="space-between">
            <Typography style={{ fontWeight: 700 }}>
              7 เหตุการณ์ล่าสุด
            </Typography>
          </Flex>
          <Divider />
          {newEvent?.data?.length === 0 || undefined ? (
            <>
              <NoDataCard />
            </>
          ) : (
            <>
              {newEvent?.data?.slice(0, 7).map((data) => (
                <>
                  <Flex
                    key={
                      dayjs(data.updatedDt).fromNow() ||
                      dayjs(data.createDt).fromNow()
                    }
                    direction="column"
                    justify="center"
                    align="flex-start"
                    gap={5}
                  >
                    <Flex direction="row">
                      <ShowTagStatus
                        status={data.status}
                        items={statusItems}
                      />
                      <Typography>
                        &nbsp;
                        {dayjs(data.updatedDt)
                          .locale('th')
                          .fromNow() ||
                          dayjs(data.createDt)
                            .locale('th')
                            .fromNow()}
                      </Typography>
                    </Flex>
                    <Typography.Link
                      onClick={() => {
                        router.push(
                          `/apps/central-management/incident/incident/${data.requestID}`
                        );
                      }}
                    >
                      {data.name || 'ไฟไหม้'}
                    </Typography.Link>
                    <Typography.Text
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {data.requestType?.event_cateogry_type.replace(
                        /_/g,
                        ' '
                      ) || 'Fire Alarm'}
                    </Typography.Text>
                  </Flex>
                  <Divider />
                </>
              ))}
            </>
          )}
        </div>
      </FallbackError>
    </>
  );
};
