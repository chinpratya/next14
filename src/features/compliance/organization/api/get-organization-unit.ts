import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationInfoSchema } from '../schemas';
import { OrganizationUnit } from '../types';

export const getOrganizationUnit = async (
  organizationId: string,
  instituteId: string
): Promise<OrganizationUnit> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}/branch/${instituteId}`
  );
  return OrganizationInfoSchema.parse(data);
};

export const useGetOrganizationUnit = (
  organizationId: string,
  instituteId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      enabled: !!organizationId && !!instituteId,
      queryKey: [
        complianceQueryKeys.organization.detailUnit(
          organizationId,
          instituteId
        ),
      ],
      queryFn: () =>
        getOrganizationUnit(organizationId, instituteId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
