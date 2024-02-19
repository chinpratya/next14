import { MenuItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

export interface ColumnItem {
  key: string;
  title: React.ReactNode | string;
  name?: string;
  dataIndex?: string;
  width?: number | 'auto';
  align?: 'left' | 'right' | 'center';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (data: any, index: number) => React.ReactNode;
}

export interface MenuItem extends MenuItemType {
  label?: React.ReactNode | string;
  key: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export type RowBoxTableType = {
  columns: ColumnItem[];
  dataSource: Array<Record<string, unknown>>;
  columnWidth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuItems?: (data: any) => MenuItem[];
  itemBoxBorderColor?: string | null;
  loading?: boolean;
};
