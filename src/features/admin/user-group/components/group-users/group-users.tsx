import { useTranslation } from 'react-i18next';

import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeleteGroupUser } from '../../api/delete-group-user';
import { useListGroupUsers } from '../../api/list-group-users';
import { GroupUser } from '../../types';

import { GroupUsersAddModal } from './group-users-add-modal';
import { GroupUsersTable } from './group-users-table';

export type GroupUsersProps = {
  groupId: string;
};

export const GroupUsers = ({
  groupId,
}: GroupUsersProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle<GroupUser>();

  const deleteGroupUser = useDeleteGroupUser({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.user.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListGroupUsers({
    groupId,
    page,
    pageSize,
  });

  return (
    <FallbackError isError={isError}>
      <GroupUsersTable
        dataSource={data?.data}
        isLoading={isLoading}
        onDelete={toggle.remove}
        onCreate={toggle.create}
        pagination={
          <Pagination
            current={page}
            pageSize={pageSize}
            total={data?.totalRecord}
            onChange={onPaginationChange}
          />
        }
      />
      <GroupUsersAddModal
        groupId={groupId}
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <DeleteModal
        open={toggle.openRemove}
        loading={deleteGroupUser.isLoading}
        identifier={toggle.data?.first_name}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteGroupUser.submit(toggle.data?.userId)
        }
      />
    </FallbackError>
  );
};
