import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteOrganizationUnit } from '../../api/delete-organization-unit';
import { useListOrganizationUnit } from '../../api/list-organization-unit';
import { OrganizationInfo } from '../../types';
import { OrganizationBasicInfoUnitCreateModal } from '../organization-basic-info-unit-create-modal';

import { OrganizationBasicInfoUnitTable } from './organization-basic-info-unit-table';

export const OrganizationBasicInfoUnitList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const organizationId = router.query
    .organizationId as string;

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { isLoading, isError, data } =
    useListOrganizationUnit({
      organizationId,
      page,
      pageSize,
    });

  const deleteUnit = useDeleteOrganizationUnit({
    organizationId,
    page,
    pageSize,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.organization.branch.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  return (
    <FallbackError isError={isError}>
      <Card>
        <OrganizationBasicInfoUnitTable
          dataSource={data?.data ?? []}
          loading={isLoading}
          onCreate={toggle.create}
          onDelete={(unit: OrganizationInfo) =>
            toggle.remove(unit)
          }
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <OrganizationBasicInfoUnitCreateModal
          organizationId={organizationId}
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name}
          onCancel={() => toggle.remove()}
          loading={deleteUnit.isLoading}
          onDelete={() =>
            deleteUnit.submit(toggle.data?.ObjectUUID)
          }
        />
      </Card>
    </FallbackError>
  );
};
