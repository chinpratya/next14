import { Card } from 'antd';
import { useRouter } from 'next/router';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination } from '@/hooks';

import { useListOrganizationUnitAssessmentListAssigned } from '../../api/list-organization-unit-assessment-list-assigned';

import { OrganizationBasicInfoUnitAssessmentListAssignedTable } from './organization-basic-info-unit-assessment-list-assigned-list-table';

export const OrganizationBasicInfoUnitAssessmentListAssignedList =
  () => {
    const router = useRouter();

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
      useListOrganizationUnitAssessmentListAssigned({
        organizationId,
        instituteId,
        page,
        pageSize,
      });

    return (
      <FallbackError isError={isError}>
        <Card>
          <OrganizationBasicInfoUnitAssessmentListAssignedTable
            dataSource={data?.data ?? []}
            loading={isLoading}
          />
          <Pagination
            current={page}
            total={data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </Card>
      </FallbackError>
    );
  };
