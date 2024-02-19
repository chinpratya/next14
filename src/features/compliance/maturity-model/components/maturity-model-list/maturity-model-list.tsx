import { Card } from 'antd';
import { useRouter } from 'next/router';

import { useToggle, usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeleteMaturityModel } from '../../api/delete-maturity-model';
import { useListMaturityModel } from '../../api/list-maturity-model';
import { MaturityModel } from '../../types';

import { MaturityModelListTable } from './maturity-model-list-table';

export type MaturityModelListProps = {
  search?: string;
};

export const MaturityModelList = ({
  search,
}: MaturityModelListProps) => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const toggle = useToggle<MaturityModel>();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const deleteMaturityModel = useDeleteMaturityModel({
    search,
    page,
    pageSize,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Maturity model deleted',
      });
      toggle.remove();
    },
  });

  const { data, isLoading, isError } =
    useListMaturityModel({
      search,
      page,
      pageSize,
    });

  const onEdit = (maturity: MaturityModel) =>
    router.push(
      `${router.pathname}/${maturity.ObjectUUID}`
    );

  const onDelete = (maturity: MaturityModel) =>
    toggle.remove(maturity);

  return (
    <FallbackError isError={isError}>
      <Card>
        <MaturityModelListTable
          isLoading={isLoading}
          dataSource={data?.data ?? []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle.data?.name}
        onCancel={() => toggle.remove()}
        loading={deleteMaturityModel.isLoading}
        onDelete={() =>
          deleteMaturityModel.submit(
            toggle.data?.ObjectUUID
          )
        }
      />
    </FallbackError>
  );
};
