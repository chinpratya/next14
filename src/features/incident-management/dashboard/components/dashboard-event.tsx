import {
  CheckCircleFilled,
  SyncOutlined,
  ExceptionOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Typography, Space } from 'antd';

import { DashboardCountResponse } from '../types';

type DashboardEventProps = {
  data: DashboardCountResponse;
};
export const DashboardEvent = ({
  data,
}: DashboardEventProps) => {
  return (
    <>
      <Flex align="flex-start" gap={80}>
        <Space
          style={{
            width: 45,
            height: 45,
            background: 'rgba(62, 121, 247, 0.10)',
            borderRadius: 4,
            padding: 0,
          }}
        >
          <Flex align="center" justify="center">
            <ExceptionOutlined
              style={{
                color: '#3E79F7',
                marginRight: 15,
                marginLeft: 10,
                fontSize: 25,
              }}
            />
          </Flex>

          <Typography style={{ fontSize: 22 }}>
            {data?.data.total ?? 0}
            <Typography style={{ fontSize: 14 }}>
              ทั้งหมด
            </Typography>
          </Typography>
        </Space>

        <Space
          style={{
            width: 45,
            height: 45,
            background: 'rgba(25, 130, 196, 0.1)',
            borderRadius: 4,
            padding: 0,
          }}
        >
          <Flex align="center" justify="center">
            <AlertOutlined
              style={{
                color: '#1982C4',
                marginRight: 15,
                marginLeft: 10,
                fontSize: 25,
              }}
            />
          </Flex>

          <Typography style={{ fontSize: 22 }}>
            {data?.data.opendCount ?? 0}
            <Typography style={{ fontSize: 14 }}>
              เปิด
            </Typography>
          </Typography>
        </Space>

        <Space
          style={{
            width: 45,
            height: 45,
            background: 'rgba(255, 202, 58, 0.1)',
            borderRadius: 4,
            padding: 0,
            marginRight: 50,
          }}
        >
          <Flex align="center" justify="center">
            <SyncOutlined
              style={{
                color: '#FFCA3A',
                marginRight: 15,
                marginLeft: 10,
                fontSize: 25,
              }}
            />
          </Flex>

          <Typography
            style={{ fontSize: 22, width: 100 }}
          >
            {data?.data.inprocressCount ?? 0}
            <Typography style={{ fontSize: 14 }}>
              กำลังดำเนินงาน
            </Typography>
          </Typography>
        </Space>

        <Space
          style={{
            width: 45,
            height: 45,
            background: 'rgba(138, 201, 38, 0.1)',
            borderRadius: 4,
            padding: 0,
          }}
        >
          <Flex align="center" justify="center">
            <CheckCircleFilled
              style={{
                color: '#8AC926',
                marginRight: 15,
                marginLeft: 10,
                fontSize: 25,
              }}
            />
          </Flex>

          <Typography style={{ fontSize: 22, width: 50 }}>
            {data?.data.completeCount ?? 0}
            <Typography style={{ fontSize: 14 }}>
              เสร็จสิ้น
            </Typography>
          </Typography>
        </Space>
      </Flex>
    </>
  );
};
