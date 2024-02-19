import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitApproverRespondentResponseSchema } from '../schemas';
import { OrganizationUnitApproverRespondentResponse } from '../types';

export const listOrganizationUnitAssessmentApproverRespondent =
  async (
    organizationId: string,
    instituteId: string,
    approverId: string
  ): Promise<OrganizationUnitApproverRespondentResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/${approverId}/respondent`
    );
    return OrganizationUnitApproverRespondentResponseSchema.parse(
      response
    );
  };

export type UseListOrganizationUnitAssessmentApproverRespondent =
  {
    organizationId: string;
    instituteId: string;
    approverId: string;
  };

export const useListOrganizationUnitAssessmentApproverRespondent =
  ({
    organizationId,
    instituteId,
    approverId,
  }: UseListOrganizationUnitAssessmentApproverRespondent) => {
    const { data, isFetched, isFetching, isError } =
      useQuery({
        queryKey: [
          complianceQueryKeys.organization.approverRespondent(
            organizationId,
            instituteId,
            approverId
          ),
        ],
        queryFn: () =>
          listOrganizationUnitAssessmentApproverRespondent(
            organizationId,
            instituteId,
            approverId
          ),
        keepPreviousData: true,
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
