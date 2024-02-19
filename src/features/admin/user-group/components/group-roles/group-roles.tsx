import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';

import { useDeleteGroupRole } from '../../api/delete-group-role';
import { useListGroupRole } from '../../api/list-group-role';
import { GroupRole } from '../../types';

import { GroupRolesAddModal } from './group-roles-add-modal';
import { GroupRolesTable } from './group-roles-table';

export type GroupRolesProps = {
  groupId: string;
};

export const GroupRoles = ({
  groupId,
}: GroupRolesProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle<GroupRole>();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } = useListGroupRole({
    groupId,
    page,
    pageSize,
  });

  const deleteGroupRole = useDeleteGroupRole({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.role.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  return (
    <FallbackError isError={isError}>
      <GroupRolesTable
        rolesGroup={data?.data}
        loading={isLoading}
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
      <GroupRolesAddModal
        groupId={groupId}
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <DeleteModal
        open={toggle.openRemove}
        loading={deleteGroupRole.isLoading}
        identifier={toggle?.data?.name as string}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteGroupRole.submit(toggle.data?.roleId)
        }
      />
    </FallbackError>
  );
};
