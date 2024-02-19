import { Flex } from '@mantine/core';
import { Typography, Space } from 'antd';

// eslint-disable-next-line no-restricted-imports
import { DashboardListOfRequestResponse } from '@/features/incident-management/dashboard/types';

type DashboardCatagoryProps = {
  data: DashboardListOfRequestResponse;
};

export const DashboardCatagory = ({
  data,
}: DashboardCatagoryProps) => {
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
      <Flex gap={10}>
        <BoxClolor
          statusCount={
            privacy?.map((data) => data.opened)[0] || 0
          }
          name={'Privacy Management'}
          color={'#EA4C86'}
        />
        <BoxClolor
          statusCount={
            physical?.map((data) => data.opened)[0] || 0
          }
          name={'Physical Security'}
          color="#FF7722"
        />
        <BoxClolor
          statusCount={
            cyber?.map((data) => data.opened)[0] || 0
          }
          name={'Cybersecurity'}
          color="#704AFF"
        />
      </Flex>
    </>
  );
};
type BoxClolorProps = {
  statusCount?: number;
  name?: string;
  color?: string;
};
const BoxClolor = ({
  statusCount,
  name,
  color,
}: BoxClolorProps) => {
  return (
    <div
      style={{
        width: 200,
      }}
    >
      <Flex direction="row" align="center">
        <Space
          style={{
            width: 50,
            height: 50,
            borderRadius: 6,
            borderWidth: 4,
            padding: 0,
            alignContent: 'center',
            justifyContent: 'center',
            border: `1px solid ${color}`,
            fontSize: 20,
            fontWeight: 700,
            color: `${color}`,
            marginRight: 10,
          }}
        >
          {statusCount}
        </Space>
        <Typography
          style={{
            fontSize: 14,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {name}
        </Typography>
      </Flex>
    </div>
  );
};
