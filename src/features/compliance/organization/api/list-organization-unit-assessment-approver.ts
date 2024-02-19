import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitApproverResponseSchema } from '../schemas';
import { OrganizationUnitApproverResponse } from '../types';

export const listOrganizationUnitAssessmentApprover =
  async (
    organizationId: string,
    instituteId: string,
    page: number,
    pageSize: number
  ): Promise<OrganizationUnitApproverResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/?page=${page}&pageSize=${pageSize}`
    );
    return OrganizationUnitApproverResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentApprover = {
  organizationId: string;
  instituteId: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationUnitAssessmentApprover =
  ({
    organizationId,
    instituteId,
    page,
    pageSize,
  }: UseListOrganizationUnitAssessmentApprover) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.approver(
            organizationId,
            instituteId
          ),
          page,
          pageSize,
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentApprover(
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
