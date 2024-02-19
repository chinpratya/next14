import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitAssignmentGrowthSectionResponseSchema } from '../schemas';
import { OrganizationUnitAssignmentGrowthSectionResponse } from '../types';

export const listOrganizationUnitAssessmentGrowthSection =
  async (
    organizationId: string,
    instituteId: string,
    assignmentId: string
  ): Promise<OrganizationUnitAssignmentGrowthSectionResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/assignment/${assignmentId}/growth/section`
    );
    return OrganizationUnitAssignmentGrowthSectionResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentGrowthSection =
  {
    organizationId: string;
    instituteId: string;
    assignmentId: string;
  };

export const useListOrganizationUnitAssessmentGrowthSection =
  ({
    organizationId,
    instituteId,
    assignmentId,
  }: UseListOrganizationUnitAssessmentGrowthSection) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.assignmentGrowthSection(
            organizationId,
            instituteId,
            assignmentId
          ),
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentGrowthSection(
            organizationId,
            instituteId,
            assignmentId
          ),
        // keepPreviousData: true,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
