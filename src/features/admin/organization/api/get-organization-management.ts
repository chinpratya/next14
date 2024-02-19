import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { OrganizationManagementSchema } from '../schemas';
import { OrganizationManagement } from '../types';

export const getOrganizationManagement = async (
  organizationId: string
): Promise<OrganizationManagement> => {
  const response = await apiClient.get(
    `/user/org/department/${organizationId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return OrganizationManagementSchema.parse(
    response?.data
  );
};

export type UseGetOrganizationManagement = {
  organizationId: string;
};

export const useGetOrganizationManagement = ({
  organizationId,
}: UseGetOrganizationManagement) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: !!organizationId,
      queryFn: () =>
        getOrganizationManagement(organizationId),
      queryKey: [
        adminQueryKeys.organizationManagement.detail(
          organizationId
        ),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
