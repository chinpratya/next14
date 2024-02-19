import {
  EyeOutlined,
  FolderOpenFilled,
  InboxOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { LuFolderLock } from 'react-icons/lu';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';

import { Directory, DirectoryLevel } from '../../types';

const { lm } = logManagementModules;

type ExplorerFolderTableProps = {
  dataSource: Directory[];
  loading?: boolean;
  level: DirectoryLevel;
  onOpen: (path: string, indexLabel?: string) => void;
  onChoose: (value: Directory) => void;
};

export const ExplorerFolderTable = ({
  dataSource,
  loading,
  level,
  onChoose,
  onOpen,
}: ExplorerFolderTableProps) => {
  const archivePermission = usePermission({
    moduleName: lm,
    policies: [permissions['cyber:lm:archive:create']],
  });

  const getDropdownItem = (
    directory: Directory
  ): ItemType[] => {
    const items: ItemType[] = [
      {
        key: 'open',
        label: <IntlMessage id="logManagement.open" />,
        icon: <EyeOutlined />,
        onClick: () =>
          onOpen(
            (level === 'index'
              ? directory.value
              : directory.path) as string,
            directory.label
          ),
      },
    ];

    if (level === 'index') {
      return items;
    } else {
      return [
        ...items,
        {
          key: 'divider',
          type: 'divider',
        },
        {
          key: 'archive',
          label: (
            <IntlMessage id="logManagement.explorer.archive" />
          ),
          icon: <InboxOutlined />,
          disabled:
            directory.archive === true ||
            !archivePermission.isAllow,
          onClick: () => onChoose(directory),
        },
      ];
    }
  };

  const columns: ColumnsType<Directory> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.explorer.name" />
      ),
      render: ({
        name,
        label,
        path,
        value,
        hour,
        archive,
      }: Directory) => (
        <Typography.Link
          className={css`
            display: flex;
            gap: 8px;
            align-items: end;
            color: #7f61ff !important;
          `}
          onClick={() =>
            onOpen(
              (level === 'index'
                ? value
                : path) as string,
              label
            )
          }
        >
          {archive ? (
            <span
              className={css`
                height: 24px;
                font-size: 24px;
              `}
            >
              <LuFolderLock />
            </span>
          ) : (
            <FolderOpenFilled
              className={css`
                font-size: 24px;
              `}
            />
          )}
          {level === 'index'
            ? label
            : level === 'hour'
            ? hour
            : name}
        </Typography.Link>
      ),
    },
    {
      key: 'type',
      title: (
        <IntlMessage id="logManagement.explorer.type" />
      ),
      render: () => (
        <IntlMessage id="logManagement.folder" />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (directory: Directory) => (
        <DropdownTable
          items={getDropdownItem(directory)}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey={level === 'index' ? 'value' : 'path'}
      dataSource={
        level === 'date'
          ? _.orderBy(dataSource, ['name'], ['desc'])
          : dataSource
      }
      columns={columns}
      loading={loading}
    />
  );
};
