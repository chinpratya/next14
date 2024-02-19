import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitAssignmentResponseSchema } from '../schemas';
import { OrganizationUnitAssignmentResponse } from '../types';

export const listOrganizationUnitAssessmentListAssigned =
  async (
    organizationId: string,
    instituteId: string,
    page: number,
    pageSize: number
  ): Promise<OrganizationUnitAssignmentResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/assignment/?page=${page}&pageSize=${pageSize}`
    );
    return OrganizationUnitAssignmentResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentListAssigned =
  {
    organizationId: string;
    instituteId: string;
    page: number;
    pageSize: number;
  };

export const useListOrganizationUnitAssessmentListAssigned =
  ({
    organizationId,
    instituteId,
    page,
    pageSize,
  }: UseListOrganizationUnitAssessmentListAssigned) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.assignment(
            organizationId,
            instituteId,
            page,
            pageSize
          ),
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentListAssigned(
            organizationId,
            instituteId,
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
