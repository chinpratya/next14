import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useSearch, usePagination } from '@/hooks';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeleteJobTilte } from '../../api/delete-job-title';
import { useListJobTitle } from '../../api/list-job-title';
import { Position } from '../../types';

import { JobTitleTable } from './job-tilte-table';

export const JobTitleList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListJobTitle({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const deletePosition = useDeleteJobTilte({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.jobTitle.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const onEdit = (position: Position) => {
    router.push(
      `${router.asPath}/${position.positionId}`
    );
  };

  return (
    <>
      <FallbackError isError={isError}>
        <Card>
          <JobTitleTable
            loading={isLoading}
            onEdit={onEdit}
            onDelete={toggle.remove}
            dataSources={data?.data || []}
            onSearch={onSearch}
          />
          <Pagination
            current={page}
            total={data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </Card>
      </FallbackError>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name as string}
        loading={deletePosition.isLoading}
        data={toggle.data}
        onCancel={() => toggle.remove()}
        onDelete={(data) =>
          deletePosition.submit(
            data?.positionId as string
          )
        }
      />
    </>
  );
};
