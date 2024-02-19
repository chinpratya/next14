import { Card } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteNotify } from '../../api/delete-notify';
import { useListNotify } from '../../api/list-notify';
import { Notify } from '../../types';
import { NotificationSettingDuplicateModal } from '../notification-setting-duplicate-modal';

import { NotificationSettingTable } from './notification-setting-table';

export const NotificationSettingList = () => {
  const router = useRouter();
  const toggle = useToggle<Notify>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } = useListNotify({
    page,
    pageSize,
  });

  const deleteNotify = useDeleteNotify({
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
    (data?.meta?.totalPage || 1) * pageSize;

  const onEdit = (notifyId: string) =>
    router.push(`${router.pathname}/${notifyId}`);

  return (
    <FallbackError isError={isError}>
      <Card>
        <NotificationSettingTable
          dataSource={data?.data}
          loading={isLoading}
          onEdit={onEdit}
          onDelete={toggle.remove}
          onDuplicate={toggle.duplicate}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          loading={deleteNotify.isLoading}
          identifier={toggle.data?.name as string}
          data={toggle.data}
          onDelete={(notify) =>
            deleteNotify.submit(notify?._id as string)
          }
          onCancel={() => toggle.remove()}
        />

        <NotificationSettingDuplicateModal
          open={toggle.openDuplicate}
          onCancel={toggle.duplicate}
          notify={toggle.data}
        />
      </Card>
    </FallbackError>
  );
};
