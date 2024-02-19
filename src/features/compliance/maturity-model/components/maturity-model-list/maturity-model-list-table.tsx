import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useColumnFiltered } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';

import { MaturityModel } from '../../types';

export type MaturityModelListTableProps = {
  isLoading?: boolean;
  dataSource: MaturityModel[];
  onEdit?: (maturityModel: MaturityModel) => void;
  onDelete?: (maturityModel: MaturityModel) => void;
};

export const MaturityModelListTable = ({
  isLoading,
  onEdit,
  onDelete,
  dataSource,
}: MaturityModelListTableProps) => {
  const columns: ColumnsType<MaturityModel> = [
    {
      title: 'ชื่อโมเดล',
      key: 'name',
      width: 400,
      render: (maturityModel: MaturityModel) => (
        <Typography.Link
          onClick={() => onEdit?.(maturityModel)}
        >
          {maturityModel.name}
        </Typography.Link>
      ),
    },
    {
      title: 'กลุ่มโมเดล',
      dataIndex: 'modelType',
      key: 'modelType',
      width: 300,
      align: 'left',
    },
    {
      title: 'จำนวนแบบประเมินที่ใช้งาน',
      dataIndex: 'numberOfWebformAvailable',
      key: 'numberOfWebformAvailable',
      width: 300,
      align: 'center',
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 300,
      align: 'center',
      render: (createdDt: string) => (
        <ShowTagDate date={createdDt} />
      ),
    },
    {
      title: 'วันที่แก้ไข',
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 300,
      align: 'center',
      render: (updatedDt: string) => (
        <ShowPassTagDate date={updatedDt} />
      ),
    },
    {
      key: 'action',
      width: 50,
      align: 'center',
      render: (maturityModel: MaturityModel) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: 'แก้ไข',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(maturityModel),
            },
            {
              key: 'delete',
              label: 'ลบ',
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(maturityModel),
            },
          ]}
        />
      ),
    },
  ];

  // const { ExportCsv } = useCsv<MaturityModel>({
  //   data: dataSource,
  //   columns,
  //   fileName: 'maturity-model',
  // });

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <>
      <Flex justify="end" gap="sm" className="mb-2">
        {/* {ExportCsv} */}
        {ColumnTransfer}
      </Flex>
      <Table
        rowKey="ObjectUUID"
        dataSource={dataSource}
        columns={filteredColumns}
        loading={isLoading}
        pagination={false}
      />
    </>
  );
};
