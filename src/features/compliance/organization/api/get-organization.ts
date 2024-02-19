import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { OrganizationInfoSchema } from '../schemas';
import { OrganizationInfo } from '../types';

export const getOrganization = async (
  organizationId: string
): Promise<OrganizationInfo> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/${organizationId}`
  );
  return OrganizationInfoSchema.parse(data);
};

export const useGetOrganization = (
  organizationId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.organization.detail(
          organizationId
        ),
      ],
      queryFn: () => getOrganization(organizationId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
