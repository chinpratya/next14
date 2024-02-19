import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Dropdown } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';

export type UseColumnAction<T> = {
  usages: Array<'view' | 'edit' | 'delete' | 'divider'>;
  onAction?: Record<string, (dataSource: T) => void>;
  width?: number;
  disabled?: Record<string, unknown>;
};

export const useColumnAction = <
  T extends Record<string, unknown>
>({
  usages,
  onAction,
  width = 50,
  disabled = {
    delete: false,
    view: false,
    edit: false,
    divider: false,
  },
}: UseColumnAction<T>): ColumnType<T> => {
  const { t } = useTranslation();

  const actionItems = [
    {
      key: 'view',
      label: t(tokens.common.view),
      icon: <EyeOutlined />,
    },
    {
      key: 'edit',
      label: t(tokens.common.edit),
      icon: <EditOutlined />,
    },
    {
      key: 'delete',
      label: t(tokens.common.delete),
      icon: <DeleteOutlined />,
    },
    {
      key: 'divider',
      type: 'divider',
    },
  ];

  const getItems = (dataSource: T) =>
    usages.map((usage) => {
      const item = actionItems.find(
        (item) => item.key === usage
      );
      return {
        ...item,
        key: item?.key ?? usage,
        onClick: () => onAction?.[usage]?.(dataSource),
        disabled: disabled[usage] ?? false,
      };
    });

  return {
    key: 'action',
    fixed: 'right',
    align: 'right',
    width,
    render: (dataSource: T) => (
      <div
        className={css`
          display: flex;
          justify-content: end;
        `}
      >
        <Dropdown
          menu={{
            items: getItems(dataSource) as ItemType[],
          }}
        >
          <Button type="link" className="p-0">
            <MoreOutlined />
          </Button>
        </Dropdown>
      </div>
    ),
  };
};
