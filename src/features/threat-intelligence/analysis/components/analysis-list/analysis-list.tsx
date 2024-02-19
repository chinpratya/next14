import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';

import { AnalysisSwitchNotify } from './analysis-switch-notify';
import data from './mock-data.json';

export const AnalysisList = () => {
  const router = useRouter();

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: 'ชื่อข่าว',
      fixed: 'left',
      width: 300,
      render: (data) => (
        <Link href={`${router.asPath}/${data.id}`}>
          {data.name}
        </Link>
      ),
    },
    {
      title: 'ประเภทการโจมตี',
      dataIndex: 'type',
    },
    {
      title: 'ระดับความเสี่ยง',
      dataIndex: 'severity',
      align: 'center',
      render: (severity: string) => (
        <ShowTagStatus
          items={[
            {
              color: '#FFC542',
              key: 'low',
              label: 'ต่ำ',
            },
            {
              color: '#FFC542',
              key: 'high',
              label: 'สูง',
            },
            {
              color: '#04D182',
              key: 'medium',
              label: 'ปานกลาง',
            },
          ]}
          status={severity}
        />
      ),
    },
    {
      title: 'วันที่',
      dataIndex: 'date',
      align: 'center',
      width: 170,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: 'แหล่งข่าว',
      dataIndex: 'source',
      align: 'center',
    },
    {
      title: 'การแจ้งเตือน',
      dataIndex: 'notify',
      align: 'center',
      render: (enabled: boolean) => (
        <AnalysisSwitchNotify enabled={enabled} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 50,
      render: () => <DropdownTable items={[]} />,
    },
  ];

  return (
    <Card>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        scroll={{ x: 1015 }}
      />
    </Card>
  );
};
