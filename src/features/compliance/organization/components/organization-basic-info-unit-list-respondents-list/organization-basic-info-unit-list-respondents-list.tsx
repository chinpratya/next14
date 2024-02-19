import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteOrganizationUnitListRespondents } from '../../api/delete-organization-unit-list-respondents';
import { useListOrganizationUnitListRespondents } from '../../api/list-organization-unit-list-respondents';
import { OrganizationUnitRespondent } from '../../types';
import { OrganizationBasicInfoUnitListRespondentsCreateModal } from '../organization-basic-info-unit-list-respondents-create-modal';
import { OrganizationBasicInfoUnitListRespondentsUpdateModal } from '../organization-basic-info-unit-list-respondents-update-modal';

import { OrganizationBasicInfoUnitListRespondentsTable } from './organization-basic-info-unit-list-respondents-list-table';

export type OrganizationBasicInfoUnitListRespondentsListProps =
  {
    onImport?: () => void;
  };

export const OrganizationBasicInfoUnitListRespondentsList =
  ({
    onImport,
  }: OrganizationBasicInfoUnitListRespondentsListProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const toggle = useToggle();
    const { showNotification } = useNotifications();

    const organizationId = router.query
      .organizationId as string;
    const instituteId = router.query
      .instituteId as string;

    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();

    const { isLoading, isError, data } =
      useListOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        page,
        pageSize,
      });

    const deleteRespondent =
      useDeleteOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        page,
        pageSize,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.respondent.delete'
            ) as string,
          });
          toggle.remove();
        },
      });

    return (
      <FallbackError isError={isError}>
        <Card>
          <OrganizationBasicInfoUnitListRespondentsTable
            dataSource={data?.data ?? []}
            loading={isLoading}
            onEdit={toggle.edit}
            onDelete={(
              respondent: OrganizationUnitRespondent
            ) => toggle.remove(respondent)}
            onAddRespondents={() => toggle.create()}
            onImportRespondents={() => onImport?.()}
          />
          <Pagination
            current={page}
            total={data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
          <OrganizationBasicInfoUnitListRespondentsCreateModal
            organizationId={organizationId}
            instituteId={instituteId}
            open={toggle.openCreate}
            onCancel={() => toggle.create()}
          />
          <OrganizationBasicInfoUnitListRespondentsUpdateModal
            organizationId={organizationId}
            instituteId={instituteId}
            respondentId={
              (toggle.data?.ObjectUUID as string) ?? ''
            }
            open={toggle.openEdit}
            onCancel={() => toggle.edit()}
          />
          <DeleteModal
            open={toggle.openRemove}
            identifier={toggle.data?.name}
            onCancel={() => toggle.remove()}
            loading={deleteRespondent.isLoading}
            onDelete={() =>
              deleteRespondent.submit(
                toggle.data?.ObjectUUID
              )
            }
          />
        </Card>
      </FallbackError>
    );
  };
