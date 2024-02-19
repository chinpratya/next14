import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Spin } from 'antd';

import { RowBoxTableBody } from './row-box-table-body';
import { RowBoxTableHeader } from './row-box-table-header';
import {
  ColumnItem,
  RowBoxTableType,
} from './row-box-table-type';

export type RowBoxTableProps = RowBoxTableType;

export const RowBoxTable = ({
  columns,
  columnWidth = 24,
  menuItems,
  loading,
  ...props
}: RowBoxTableProps) => {
  const dropDownMenu: ColumnItem = {
    title: null,
    key: 'more',
    width: 1,
    align: 'right',
    render: (data: Array<Record<string, unknown>>) => (
      <Dropdown
        menu={{ items: menuItems ? menuItems(data) : [] }}
      >
        <MoreOutlined />
      </Dropdown>
    ),
  };

  const getColumns = menuItems
    ? [...columns, dropDownMenu]
    : columns;

  const getColumnWidth = menuItems
    ? columnWidth + 1
    : columnWidth;

  return (
    <Spin spinning={loading}>
      <RowBoxTableHeader
        columns={getColumns}
        columnWidth={getColumnWidth}
        {...props}
      />
      <RowBoxTableBody
        columns={getColumns}
        columnWidth={getColumnWidth}
        {...props}
      />
    </Spin>
  );
};
