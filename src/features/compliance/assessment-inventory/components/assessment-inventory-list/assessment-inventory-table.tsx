import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentInventory } from '../../types';

export type InventoryTableProps = {
  dataSource?: AssessmentInventory[];
  loading: boolean;
  onEdit: (inventory: AssessmentInventory) => void;
};

export const AssessmentInventoryTable = ({
  loading,
  dataSource,
  onEdit,
}: InventoryTableProps) => {
  const readPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:template:read'],
    ],
  });

  const columns: ColumnsType<AssessmentInventory> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="compliance.assessmentInventory.name" />
      ),
      width: 400,
      render: (inventory: AssessmentInventory) => (
        <Typography.Link
          className="p-0"
          onClick={() => onEdit(inventory)}
          disabled={!readPermission.isAllow}
        >
          {inventory?.name}
        </Typography.Link>
      ),
    },
    {
      key: 'description',
      title: (
        <IntlMessage id="compliance.assessmentInventory.description" />
      ),
      dataIndex: 'description',
    },
    {
      key: 'createdDt',
      title: (
        <IntlMessage id="compliance.assessmentInventory.createdDt" />
      ),
      align: 'center',
      dataIndex: 'createdDt',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
  ];

  // const { ExportCsv } = useCsv({
  //   columns,
  //   data: dataSource,
  //   fileName: 'assessment-inventory',
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
        tableLayout="fixed"
        rowKey="ObjectUUID"
        columns={filteredColumns}
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: true }}
        pagination={false}
      />
    </>
  );
};
