import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitApproverSchema } from '../schemas';
import { OrganizationUnitApprover } from '../types';

export const getOrganizationUnitAssessmentApprover =
  async (
    organizationId: string,
    instituteId: string,
    approverId: string
  ): Promise<OrganizationUnitApprover> => {
    const { data } = await apiClient.get(
      `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/approver/${approverId}`
    );
    return OrganizationUnitApproverSchema.parse(data);
  };

export const useGetOrganizationUnitAssessmentApprover = (
  organizationId: string,
  instituteId: string,
  approverId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled:
        !!organizationId && !!instituteId && !!approverId,
      queryKey: [
        complianceQueryKeys.organization.detailApprover(
          organizationId,
          instituteId,
          approverId
        ),
      ],
      queryFn: () =>
        getOrganizationUnitAssessmentApprover(
          organizationId,
          instituteId,
          approverId
        ),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
