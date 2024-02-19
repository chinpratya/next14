import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteOrganizationUnitAssessmentApprover } from '../../api/delete-organization-unit-assessment-approver';
import { useListOrganizationUnitAssessmentApprover } from '../../api/list-organization-unit-assessment-approver';
import { OrganizationUnitApprover } from '../../types';
import { OrganizationBasicInfoUnitAssessmentApproverCreateModal } from '../organization-basic-info-unit-assessment-approver-create-modal';
import { OrganizationBasicInfoUnitAssessmentApproverModalRespondent } from '../organization-basic-info-unit-assessment-approver-modal-respondent';
import { OrganizationBasicInfoUnitAssessmentApproverUpdateModal } from '../organization-basic-info-unit-assessment-approver-update-modal';
import { OrganizationBasicInfoUnitListRespondentsListImportModal } from '../organization-basic-info-unit-list-respondents-list-import-modal';

import { OrganizationBasicInfoUnitAssessmentApproverTable } from './organization-basic-info-unit-assessment-approver-list-table';

export const OrganizationBasicInfoUnitAssessmentApproverList =
  () => {
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
      useListOrganizationUnitAssessmentApprover({
        organizationId,
        instituteId,
        page,
        pageSize,
      });

    const deleteApprover =
      useDeleteOrganizationUnitAssessmentApprover({
        organizationId,
        instituteId,
        page,
        pageSize,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.organization.branch.approver.delete'
            ) as string,
          });
          toggle.remove();
        },
      });

    return (
      <FallbackError isError={isError}>
        <Card>
          <OrganizationBasicInfoUnitAssessmentApproverTable
            dataSource={data?.data ?? []}
            loading={isLoading}
            onEdit={toggle.edit}
            onDelete={(
              approver: OrganizationUnitApprover
            ) => toggle.remove(approver)}
            onChoose={toggle.choose}
            onAddRespondent={() => toggle.create()}
          />
          <Pagination
            current={page}
            total={data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
          <OrganizationBasicInfoUnitAssessmentApproverCreateModal
            organizationId={organizationId}
            instituteId={instituteId}
            open={toggle.openCreate}
            onCancel={() => toggle.create()}
          />
          <OrganizationBasicInfoUnitAssessmentApproverUpdateModal
            organizationId={organizationId}
            instituteId={instituteId}
            approverId={
              (toggle.data?.ObjectUUID as string) ?? ''
            }
            open={toggle.openEdit}
            onCancel={() => toggle.edit()}
          />
          <DeleteModal
            open={toggle.openRemove}
            identifier={toggle.data?.name}
            onCancel={() => toggle.remove()}
            loading={deleteApprover.isLoading}
            onDelete={() =>
              deleteApprover.submit(
                toggle.data?.ObjectUUID
              )
            }
          />
          <OrganizationBasicInfoUnitAssessmentApproverModalRespondent
            organizationId={organizationId}
            instituteId={instituteId}
            approverId={toggle.data?.ObjectUUID}
            open={toggle.openChoose}
            onCancel={toggle.choose}
          />
          <OrganizationBasicInfoUnitListRespondentsListImportModal
            organizationId={organizationId}
            instituteId={instituteId}
            open={toggle.openImport}
            onCancel={() => toggle.importData()}
          />
        </Card>
      </FallbackError>
    );
  };
