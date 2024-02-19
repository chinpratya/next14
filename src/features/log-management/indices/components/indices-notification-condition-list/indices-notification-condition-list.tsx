import { Card, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteHostname } from '../../api/delete-hostname';
import { useListHostname } from '../../api/list-hostname';
import { useListNotify } from '../../api/list-notify';
import { useUpdateHostname } from '../../api/update-hostname';
import { Monitor } from '../../types';
import { IndicesNotificationGroupModal } from '../indices-notification-group-modal';

import { IndicesNotificationConditionTable } from './indices-notification-condition-table';

type IndicesNotificationConditionListProps = {
  permissions: {
    isUpdate?: boolean;
    isDelete?: boolean;
  };
};

export const IndicesNotificationConditionList = ({
  permissions,
}: IndicesNotificationConditionListProps) => {
  const router = useRouter();
  const toggle = useToggle<Monitor>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const indiceId = router.query.indiceId as string;

  const [form] = Form.useForm();

  const { data, isError, isLoading } = useListHostname({
    indices: indiceId,
    module: 'LM',
    page,
    page_size: pageSize,
  });

  const deleteHostname = useDeleteHostname({
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

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.updated'
      ) as string,
    });
    toggle.edit();
  };

  const listNotify = useListNotify();
  const updateMonitor = useUpdateHostname({
    onSuccess,
  });

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  const onDelete = (data: Monitor) => toggle.remove(data);

  const onEdit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const payload = {
      _id: toggle.data._id,
      ...values,
      module: 'LM',
    };
    delete payload.hostname;
    updateMonitor.submit(payload);
  };

  return (
    <FallbackError isError={isError}>
      <Card>
        <IndicesNotificationConditionTable
          dataSource={data?.data}
          loading={isLoading || listNotify.isLoading}
          onEdit={toggle.edit}
          notifyList={listNotify.data?.data ?? []}
          permissions={permissions}
          onDelete={onDelete}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />

        <DeleteModal
          open={toggle.openRemove}
          loading={deleteHostname.isLoading}
          identifier={toggle.data?.hostname as string}
          data={toggle.data}
          onDelete={() =>
            deleteHostname.submit(toggle.data._id)
          }
          onCancel={() => toggle.remove()}
        />

        <IndicesNotificationGroupModal
          form={form}
          notifyList={listNotify.data?.data ?? []}
          open={toggle.openEdit}
          data={toggle.data}
          onClose={toggle.edit}
          loading={updateMonitor.isLoading}
          isEditor
          readonly={!permissions.isUpdate}
          onSubmit={onEdit}
        />
      </Card>
    </FallbackError>
  );
};
