import { Card } from 'antd';
import { t } from 'i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteArchive } from '../../api/delete-archive';
import { useListArchive } from '../../api/list-archive';
import { Archive } from '../../types';
import { ArchiveDetail } from '../archive-detail';

import { ArchiveTable } from './archive-table';

type ArchiveListProps = {
  search?: string;
};

export const ArchiveList = ({
  search,
}: ArchiveListProps) => {
  const toggle = useToggle<Archive>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } = useListArchive({
    page,
    search,
    pageSize,
  });

  const deleteArchive = useDeleteArchive({
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

  return (
    <FallbackError isError={isError}>
      <Card>
        <ArchiveTable
          dataSource={data?.data ?? []}
          loading={isLoading}
          onPreview={toggle.preview}
          onDelete={toggle.remove}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />

        <ArchiveDetail
          open={toggle.openPreview}
          onClose={toggle.preview}
          data={toggle.data}
        />

        <DeleteModal
          open={toggle.openRemove}
          loading={deleteArchive.isLoading}
          identifier={
            toggle.data?.name?.split('/')?.[0] as string
          }
          data={toggle.data}
          onDelete={(archive) =>
            deleteArchive.submit(archive?.id as string)
          }
          onCancel={() => toggle.remove()}
        />
      </Card>
    </FallbackError>
  );
};
