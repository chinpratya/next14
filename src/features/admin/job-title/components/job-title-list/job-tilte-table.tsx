import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useColumnFiltered } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { IntlMessage } from '@utilComponents/intl-message';

import { Position } from '../../types';

export type JobTitleTableProps = {
  loading?: boolean;
  onEdit: (position: Position) => void;
  onDelete: (position: Position) => void;
  dataSources: Position[];
  onSearch: (search: string) => void;
};

export const JobTitleTable = ({
  loading,
  onEdit,
  onDelete,
  dataSources,
  onSearch,
}: JobTitleTableProps) => {
  const columns: ColumnsType<Position> = [
    {
      title: (
        <IntlMessage id="admin.userManagement.jobTitle.table.th" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.jobTitle.table.en" />
      ),
      dataIndex: 'name_en',
      key: 'name_en',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.jobTitle.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (position: Position) => (
        <DropdownTable
          items={[
            {
              label: 'Edit',
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(position),
            },
            {
              label: 'Delete',
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(position),
            },
          ]}
        />
      ),
    },
  ];
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  return (
    <>
      <Flex justifyContent={'end'} alignItems={'center'}>
        <InputSearch
          onSearch={onSearch}
          className="mr-2"
        />
        {ColumnTransfer}
      </Flex>
      <Table
        loading={loading}
        columns={filteredColumns}
        rowKey="positionId"
        dataSource={dataSources}
        pagination={false}
        scroll={{ x: 600 }}
        tableLayout="fixed"
      />
    </>
  );
};
