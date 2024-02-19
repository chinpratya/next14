import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitAssignmentRespondentResponseSchema } from '../schemas';
import { OrganizationUnitAssignmentRespondentResponse } from '../types';

export const listOrganizationUnitAssessmentListAssignedListAssessors =
  async (
    organizationId: string,
    instituteId: string,
    assignmentId: string,
    page: number,
    pageSize: number
  ): Promise<OrganizationUnitAssignmentRespondentResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/assignment/${assignmentId}/respondent/?page=${page}&pageSize=${pageSize}`
    );
    return OrganizationUnitAssignmentRespondentResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentListAssignedListAssessors =
  {
    organizationId: string;
    instituteId: string;
    assignmentId: string;
    page: number;
    pageSize: number;
  };

export const useListOrganizationUnitAssessmentListAssignedListAssessors =
  ({
    organizationId,
    instituteId,
    assignmentId,
    page,
    pageSize,
  }: UseListOrganizationUnitAssessmentListAssignedListAssessors) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.assignmentRespondent(
            organizationId,
            instituteId,
            assignmentId,
            page,
            pageSize
          ),
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentListAssignedListAssessors(
            organizationId,
            instituteId,
            assignmentId,
            page,
            pageSize
          ),
        keepPreviousData: true,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
