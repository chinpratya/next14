import {
  DownloadOutlined,
  EyeOutlined,
  FileSearchOutlined,
  FileZipOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { BsFileEarmarkLock2 } from 'react-icons/bs';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { Flex } from '@/components/share-components/flex';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { convertBytesToSize } from '@/utils';

import { Archive, Directory } from '../../types';
import { ExplorerDownloadModal } from '../explorer-download-modal';

type ExplorerFileTableProps = {
  dataSource: Directory[];
  loading?: boolean;
  onChoose: (value: Directory) => void;
  onEdit: (value: Directory) => void;
  onPreview: (value: Directory) => void;
};

export const ExplorerFileTable = ({
  dataSource,
  loading,
  onChoose,
  onEdit,
  onPreview,
}: ExplorerFileTableProps) => {
  const toggle = useToggle();

  const archivePermission = usePermission({
    moduleName: 'log',
    policies: [permissions['cyber:lm:archive:create']],
  });

  const [selectedRows, setSelectedRows] = useState<
    Directory[]
  >([]);

  const columns: ColumnsType<Directory> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.explorer.name" />
      ),
      render: (directory: Directory) => (
        <Flex alignItems="center">
          {(directory.archive as Archive).is ? (
            <span
              className={css`
                width: 24px;
                height: 24px;
                margin-right: 8px;
              `}
            >
              <BsFileEarmarkLock2
                className={css`
                  font-size: 24px;
                  color: #7f61ff !important;
                `}
              />
            </span>
          ) : (
            <FileZipOutlined
              className={css`
                margin-right: 8px;
                font-size: 24px;
                color: #7f61ff !important;
              `}
            />
          )}

          <Typography.Link
            className={css`
              color: #7f61ff !important;
            `}
            onClick={() => onEdit(directory)}
          >
            {directory.name}
          </Typography.Link>
        </Flex>
      ),
    },
    {
      key: 'size',
      width: 200,
      title: (
        <IntlMessage id="logManagement.explorer.size" />
      ),
      dataIndex: 'size',
      render: (size: number) => (
        <Typography.Text>
          {convertBytesToSize(size)}
        </Typography.Text>
      ),
    },
    {
      key: 'type',
      title: (
        <IntlMessage id="logManagement.explorer.type" />
      ),
      width: 200,
      render: () => (
        <IntlMessage id="logManagement.file" />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (directory: Directory) => (
        <DropdownTable
          items={[
            {
              key: 'open',
              label: (
                <IntlMessage id="logManagement.open" />
              ),
              icon: <EyeOutlined />,
              onClick: () => onEdit(directory),
            },
            {
              key: 'detail',
              label: (
                <IntlMessage id="logManagement.detail" />
              ),
              icon: <FileSearchOutlined />,
              onClick: () => onPreview(directory),
            },
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
                (directory.archive as Archive).is ===
                  true || !archivePermission.isAllow,
              onClick: () => onChoose(directory),
            },
            {
              key: 'download',
              label: (
                <IntlMessage id="logManagement.download" />
              ),
              icon: <DownloadOutlined />,
              onClick: () => {
                setSelectedRows([directory]);
                toggle.choose();
              },
            },
          ]}
        />
      ),
    },
  ];

  const onSelectChange = (selected: Directory[]) => {
    setSelectedRows(selected);
  };

  const onDownload = () => {
    const selectedCount = selectedRows.length;
    if (selectedCount < 1 || selectedCount > 5) return;

    toggle.choose();
  };

  const onRemoveFile = (fileId: string) => {
    const result = selectedRows.filter(
      (item) => item.id !== fileId
    );

    if (result.length < 1 && toggle.openChoose) {
      toggle.choose();
    }
    setSelectedRows(result);
  };

  return (
    <>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={false}
        rowSelection={{
          selectedRowKeys: selectedRows.map(
            (item) => item.id as string
          ),
          preserveSelectedRowKeys: true,
          onChange: (_, newSelectedRow) =>
            onSelectChange(newSelectedRow),
          columnWidth: 70,
          selections: [
            {
              key: 'download',
              text: (
                <Typography.Text
                  disabled={
                    selectedRows.length < 1 ||
                    selectedRows.length > 5
                  }
                >
                  <DownloadOutlined
                    className="mr-2"
                    disabled
                  />
                  <IntlMessage id="logManagement.download" />
                </Typography.Text>
              ),
              onSelect: onDownload,
            },
          ],
        }}
      />

      <ExplorerDownloadModal
        files={selectedRows ?? []}
        open={toggle.openChoose}
        onCancel={toggle.choose}
        onSelectChange={onSelectChange}
        onRemoveFile={onRemoveFile}
      />
    </>
  );
};
