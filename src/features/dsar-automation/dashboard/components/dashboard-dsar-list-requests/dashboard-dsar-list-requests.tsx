import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { NoneProfile } from '@components/none-profile';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';

import { DashboardRequests } from '../../types';

export const DashboardDsarListRequests = () => {
  const columns: ColumnsType<DashboardRequests> = [
    {
      title: 'รหัส',
      dataIndex: 'requestID',
      key: 'requestID',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        return <ShowTagStatus status={status} />;
      },
    },
    {
      title: 'วันที่เหลือ',
      dataIndex: 'remaining_day',
      key: 'remaining_day',
      width: 100,
      render: (remaining_day: string) => {
        return <ShowTagDate date={remaining_day} />;
      },
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 100,
      render: (created_dt: string) => {
        return <ShowTagDate date={created_dt} />;
      },
    },
    {
      title: 'ผู้อนุมัติ',
      dataIndex: 'approver',
      key: 'approver',
      width: 50,
      render: (approver: string) => (
        <NoneProfile title={approver} />
      ),
    },
  ];
  return (
    <Card title="รายการคำขอ">
      <Table
        columns={columns}
        dataSource={[]}
        scroll={{ x: 650 }}
        tableLayout="fixed"
      />
    </Card>
  );
};
