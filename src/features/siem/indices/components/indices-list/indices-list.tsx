import { Card } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';

import { useDeleteIndice } from '../../api/delete-indice';
import { useListIndice } from '../../api/list-indice';
import { Indice, IndiceResponse } from '../../types';

import { IndicesTable } from './indices-table';

export const IndicesList = () => {
  const toggle = useToggle();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListIndice({
    page,
    pageSize,
  });

  const deleteIndice = useDeleteIndice({
    page,
    pageSize,
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

  const onEdit = (indice: Indice) => {
    router.push(`${router.pathname}/${indice.id}`);
  };

  return (
    <FallbackError isError={isError}>
      <Card>
        <IndicesTable
          dataSource={
            (data as IndiceResponse)?.data ?? []
          }
          loading={isLoading}
          onEdit={onEdit}
          onDelete={toggle.remove}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />

        <DeleteModal
          open={toggle.openRemove}
          loading={deleteIndice.isLoading}
          identifier={toggle.data?.name as string}
          data={toggle.data}
          onDelete={(indice) =>
            deleteIndice.submit(indice?.id as string)
          }
          onCancel={() => toggle.remove()}
        />
      </Card>
    </FallbackError>
  );
};
