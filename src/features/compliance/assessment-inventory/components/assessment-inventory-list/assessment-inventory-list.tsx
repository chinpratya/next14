import { Card } from 'antd';
import { useRouter } from 'next/router';

import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeleteAssessmentInventory } from '../../api/delete-assessment-inventory';
import { useListAssessmentInventory } from '../../api/list-assessment-inventory';
import { AssessmentInventory } from '../../types';

import { AssessmentInventoryTable } from './assessment-inventory-table';

export const AssessmentInventoryList = () => {
  const router = useRouter();
  const toggle = useToggle<AssessmentInventory>();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'ลบแบบประเมินสำเร็จ',
    });
    toggle.remove();
  };

  const deleteInventoryModel =
    useDeleteAssessmentInventory({ onSuccess });

  const { data, isLoading, isError } =
    useListAssessmentInventory({
      page,
      pageSize,
    });

  const onEdit = (inventory: AssessmentInventory) =>
    router.push(
      `${router.pathname}/${inventory.ObjectUUID}`
    );

  return (
    <FallbackError isError={isError}>
      <Card>
        <AssessmentInventoryTable
          onEdit={onEdit}
          dataSource={data?.data}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name}
          onCancel={() => toggle.remove()}
          loading={deleteInventoryModel.isLoading}
          onDelete={() =>
            deleteInventoryModel.submit(
              toggle.data?.ObjectUUID
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
