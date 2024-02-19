import {
  DeleteOutlined,
  EyeOutlined,
  FolderOpenFilled,
  InboxOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { Flex } from '@/components/share-components/flex';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

import { Archive } from '../../types';

type ArchiveTableProps = {
  dataSource?: Archive[];
  loading?: boolean;
  onPreview?: (archive: Archive) => void;
  onDelete?: (archive: Archive) => void;
};

export const ArchiveTable = ({
  loading,
  dataSource,
  onPreview,
  onDelete,
}: ArchiveTableProps) => {
  const deletePermission = usePermission({
    moduleName: 'log',
    policies: [permissions['cyber:lm:archive:delete']],
  });

  const columns: ColumnsType<Archive> = [
    {
      key: 'path',
      title: (
        <IntlMessage id="logManagement.archive.detail" />
      ),
      width: 200,
      fixed: 'left',
      render: (archive: Archive) => (
        <Flex
          alignItems="center"
          className={css`
            span.anticon {
              margin-right: 11px;
              font-size: 34px;
              color: #7f61ff !important;
            }
          `}
        >
          {archive.type === 'Folder' ? (
            <FolderOpenFilled />
          ) : (
            <InboxOutlined />
          )}

          <Typography.Text>
            {archive.name}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'type',
      title: (
        <IntlMessage id="logManagement.archive.type" />
      ),
      dataIndex: 'type',
      width: 70,
      render: (value: string) => (
        <IntlMessage
          id={`logManagement.${value.toLowerCase()}`}
        />
      ),
    },
    {
      key: 'startDate',
      title: (
        <IntlMessage id="logManagement.archive.startDate" />
      ),
      dataIndex: 'created_date',
      align: 'center',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'endDate',
      align: 'center',
      title: (
        <IntlMessage id="logManagement.archive.endDate" />
      ),
      width: 150,
      render: ({ created_date, archive }: Archive) => (
        <ShowTagDate
          date={dayjs(created_date)
            .add(archive, 'day')
            .toString()}
        />
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (archive: Archive) => (
        <DropdownTable
          items={[
            {
              key: 'detail',
              label:
                archive.type === 'File' ? (
                  <IntlMessage id="logManagement.detail" />
                ) : (
                  <IntlMessage id="logManagement.open" />
                ),
              icon: <EyeOutlined />,
              disabled: archive.type === 'Folder',
              onClick: () => onPreview?.(archive),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => onDelete?.(archive),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      pagination={false}
    />
  );
};
