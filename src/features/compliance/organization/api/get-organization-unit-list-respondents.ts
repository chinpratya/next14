import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationUnitRespondentSchema } from '../schemas';
import { OrganizationUnitRespondent } from '../types';

export const getOrganizationUnitListRespondents = async (
  organizationId: string,
  instituteId: string,
  respondentId: string
): Promise<OrganizationUnitRespondent> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}/respondent/${respondentId}`
  );
  return OrganizationUnitRespondentSchema.parse(data);
};

export const useGetOrganizationUnitListRespondents = (
  organizationId: string,
  instituteId: string,
  respondentId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled:
        !!organizationId &&
        !!instituteId &&
        !!respondentId,
      queryKey: [
        complianceQueryKeys.organization.detailRespondent(
          organizationId,
          instituteId,
          respondentId
        ),
      ],
      queryFn: () =>
        getOrganizationUnitListRespondents(
          organizationId,
          instituteId,
          respondentId
        ),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
