import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import {
  OrganizationUnitApproverResponse,
  OrganizationUnitApproverResponseSchema,
} from '../../organization';

export const listOrganizationUnitAssessmentApprovers =
  async (
    organizationId: string,
    instituteId: string,
    page: number,
    pageSize: number
  ): Promise<OrganizationUnitApproverResponse> => {
    const response = await apiClient.get(
      `/setting/organization/${organizationId}/branch/${instituteId}/approver?page=${page}&pageSize=${pageSize}`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
    return OrganizationUnitApproverResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentApprovers = {
  organizationID: string;
  branchID: string;
  page: number;
  pageSize: number;
};

export const useListOrganizationUnitAssessmentApprovers =
  ({
    organizationID,
    branchID,
    page,
    pageSize,
  }: UseListOrganizationUnitAssessmentApprovers) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.approver(
            organizationID,
            branchID
          ),
          page,
          pageSize,
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentApprovers(
            organizationID,
            branchID,
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
