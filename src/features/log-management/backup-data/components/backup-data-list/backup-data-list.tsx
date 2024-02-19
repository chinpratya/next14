import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteBackupData } from '../../api/delete-backup-data';
import { useListBackupData } from '../../api/list-backup-data';
import { BackupData } from '../../types';
import { BackupDataEditModal } from '../backup-data-edit-modal';
import { BackupDataSeverityTag } from '../backup-data-severity-tag';

export const BackupDataList = () => {
  const router = useRouter();
  const toggle = useToggle<BackupData>();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({ pageSize: 10 });

  const { data, isError, isLoading } = useListBackupData({
    page,
    page_size: pageSize,
  });

  const deleteBackupData = useDeleteBackupData({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.deleted'
        ) as string,
      });
      toggle.remove();
    },
  });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const columns: ColumnsType<BackupData> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.backupData.name" />
      ),
      fixed: 'left',
      render: ({ id, name }: BackupData) => (
        <Link href={`${router.pathname}/${id}`}>
          {name}
        </Link>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.report.scheduler.title" />
      ),
      key: 'scheduler',
      dataIndex: 'scheduler',
      render: (scheduler: string) => (
        <IntlMessage
          id={`logManagement.backupData.${scheduler.toLowerCase()}`}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.backupData.backup" />
      ),
      key: 'backup',
      render: ({ backup }: BackupData) => {
        const text: string[] = [];

        Object.entries(backup).map(([keys, value]) => {
          if (value)
            text.push(
              keys.charAt(0).toUpperCase() + keys.slice(1)
            );
        });

        return (
          <Typography.Text>
            {text.length < 1 ? '-' : text.join(', ')}
          </Typography.Text>
        );
      },
    },
    {
      title: (
        <IntlMessage id="logManagement.dashboard.status" />
      ),
      key: 'status',
      align: 'center',
      dataIndex: 'enabled',
      render: (enabled: string) => (
        <ShowTagStatus
          status={enabled.toString()}
          items={[
            {
              label: 'logManagement.active',
              key: 'true',
              color: SUCCESS_COLOR,
            },
            {
              label: 'logManagement.inactive',
              key: 'false',
              color: ERROR_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.backupData.activity" />
      ),
      key: 'activity',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => (
        <BackupDataSeverityTag status={status} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (backupData: BackupData) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => toggle.edit(backupData),
            },
            {
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(backupData),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          rowKey="id"
          dataSource={data?.data}
          columns={columns}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <BackupDataEditModal
          backupDataId={toggle.data?.id}
          open={toggle.openEdit}
          onCancel={toggle.edit}
        />
        <DeleteModal
          open={toggle.openRemove}
          loading={deleteBackupData.isLoading}
          identifier={toggle.data?.name as string}
          data={toggle.data}
          onDelete={(data) =>
            deleteBackupData.submit(data?.id as string)
          }
          onCancel={() => toggle.remove()}
        />
      </Card>
    </FallbackError>
  );
};
