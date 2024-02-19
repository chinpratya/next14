import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitAssignmentGrowthSectionResponseSchema } from '../schemas';
import { OrganizationUnitAssignmentGrowthSectionResponse } from '../types';

export const listOrganizationUnitAssessmentGrowthOverview =
  async (
    organizationId: string,
    instituteId: string,
    assignmentId: string
  ): Promise<OrganizationUnitAssignmentGrowthSectionResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/assignment/${assignmentId}/growth/overview`
    );
    return OrganizationUnitAssignmentGrowthSectionResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentGrowthOverview =
  {
    organizationId: string;
    instituteId: string;
    assignmentId: string;
  };

export const useListOrganizationUnitAssessmentGrowthOverview =
  ({
    organizationId,
    instituteId,
    assignmentId,
  }: UseListOrganizationUnitAssessmentGrowthOverview) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.assignmentGrowthOverview(
            organizationId,
            instituteId,
            assignmentId
          ),
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentGrowthOverview(
            organizationId,
            instituteId,
            assignmentId
          ),
        keepPreviousData: true,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
