/* eslint-disable no-restricted-imports */
import { Flex } from '@mantine/core';
import {
  Card,
  Radio,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';
import { useState } from 'react';

import {
  Dashboard,
  DashboardEvent,
  ProgressCard,
  DashboardEventNewUpdate,
  DashboardCatagoryChart,
  DashboardCatagoryProgress,
  DashboardCatagory,
  DashboardViolenceChart,
} from '@/features/incident-management';
import { UseDashboardCount } from '@/features/incident-management/dashboard/api/get-dashboard-count';
import { UseDashboardListOfRequest } from '@/features/incident-management/dashboard/api/get-dashboard-list-of-request';
import { UseDashboardNumberRequest } from '@/features/incident-management/dashboard/api/get-dashboard-number-request';
import {
  DashboardByTimeResponse,
  DashboardListOfRequestResponse,
  DashboardCountResponse,
} from '@/features/incident-management/dashboard/types';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const DashboardPage = () => {
  const [duration, setDuration] = useState('day');
  const { data } = UseDashboardListOfRequest(duration);
  const { data: listOfRequestData } =
    UseDashboardNumberRequest(duration);
  const { data: count } = UseDashboardCount(duration);
  const onChange = (key: string) => {
    setDuration(key);
  };
  return (
    <FallbackError isError={false}>
      <PageHeader
        title="Dashboard"
        extra={
          <>
            <Flex align="flex-end">
              <Radio.Group
                onChange={(e) => onChange(e.target.value)}
                defaultValue={duration}
              >
                <Radio.Button value="day">
                  24 ชั่วโมงย้อนหลัง
                </Radio.Button>
                <Radio.Button value="week">
                  7 วันย้อนหลัง
                </Radio.Button>
                {/* <Radio.Button value="month">
                  เดือนนี้
                </Radio.Button>
                <Radio.Button value="year">
                  ปีนี้
                </Radio.Button> */}
              </Radio.Group>
            </Flex>
          </>
        }
      />

      <Flex direction="row" gap={10}>
        <Card
          style={{
            width: '80%',
            height: '100%',
            minWidth: '70%',
            maxWidth: '100%',
          }}
        >
          <Typography>เหตุการณ์</Typography>
          <Divider />
          <DashboardEvent
            data={count as DashboardCountResponse}
          />

          <Row gutter={30}>
            <Col {...getColLayout(24)}>
              <Typography
                style={{
                  paddingTop: 30,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                ระดับความรุนแรงของเหตุการณ์
              </Typography>
            </Col>
            <Col {...getColLayout(16)}>
              <Dashboard
                data={data as DashboardByTimeResponse}
              />
            </Col>
            <Col {...getColLayout(8)}>
              <ProgressCard
                count={count}
                value={data as DashboardByTimeResponse}
              />
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            width: '20%',
            minWidth: '20%',
          }}
        >
          <DashboardEventNewUpdate />
        </Card>
      </Flex>

      <Flex direction="row" gap={10}>
        <Card
          style={{
            width: '80%',
          }}
        >
          <Typography>
            กราฟของเหตุการณ์ตามประเภท
          </Typography>
          <Divider />
          <Row gutter={10}>
            <Col {...getColLayout(24)}>
              <DashboardCatagory
                data={
                  listOfRequestData as DashboardListOfRequestResponse
                }
              />
            </Col>
            <Col {...getColLayout(16)}>
              {' '}
              <DashboardCatagoryChart
                data={
                  listOfRequestData as DashboardListOfRequestResponse
                }
              />
            </Col>
            <Col {...getColLayout(8)}>
              {' '}
              <DashboardCatagoryProgress
                data={
                  listOfRequestData as DashboardListOfRequestResponse
                }
              />
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            width: '20%',
            height: '50%',
          }}
        >
          <Typography>ความรุนแรง</Typography>
          <Divider />
          <DashboardViolenceChart
            value={data as DashboardByTimeResponse}
          />
        </Card>
      </Flex>
    </FallbackError>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default DashboardPage;
