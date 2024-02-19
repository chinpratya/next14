import { Card } from 'antd';
import { useRouter } from 'next/router';

import { FallbackError } from '@/components/util-components/fallback-error';
import { usePagination } from '@/hooks';

import { useListOrganizationUnitAssessmentListAssignedListAssessors } from '../../api/list-organization-unit-assessment-list-assigned-list-assessors';

import { OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsTable } from './organization-basic-info-unit-assessment-list-assigned-list-assessors-list-table';

export const OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsList =
  () => {
    const router = useRouter();

    const organizationId = router.query
      .organizationId as string;
    const instituteId = router.query
      .instituteId as string;
    const assignmentId = router.query
      .assignmentId as string;

    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();

    const { isLoading, isError, data } =
      useListOrganizationUnitAssessmentListAssignedListAssessors(
        {
          organizationId,
          instituteId,
          assignmentId,
          page,
          pageSize,
        }
      );

    return (
      <FallbackError isError={isError}>
        <Card>
          <OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsTable
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
