import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { useColumnFiltered } from '@/hooks';

import data from './mock-data.json';

export const AnalysisInfoAttackList = () => {
  const columns: ColumnsType<Record<string, unknown>> = [
    {
      key: 'date',
      title: 'วันที่ได้รับรายงานการโจมตี',
      dataIndex: 'date',
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'type',
      title: 'ประเภทการโจมตี',
      dataIndex: 'type',
    },
    {
      key: 'typeAttack',
      title: 'ประเภทของข้อมูลที่ใช้ในการโจมตี',
      dataIndex: 'typeAttack',
    },
    {
      key: 'ip',
      title: 'การโจมตีค่าที่ใช้ในการโจมตี',
      dataIndex: 'ip',
    },
    {
      key: 'country',
      title: 'ประเทศ',
      dataIndex: 'country',
    },
    {
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 50,
      render: () => <DropdownTable items={[]} />,
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: ['date', 'ip'],
    });

  return (
    <Card
      title="รายละเอียดการโจมตี"
      className="h-100"
      extra={<>{ColumnTransfer}</>}
    >
      <Table
        rowKey="id"
        dataSource={data.attackList}
        columns={filteredColumns}
        pagination={false}
      />
    </Card>
  );
};
