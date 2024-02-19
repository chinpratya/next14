import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { OrganizationManagementSchema } from '../schemas';
import { OrganizationManagement } from '../types';

export const getOrganizationInfo =
  async (): Promise<OrganizationManagement> => {
    const response = await apiClient.get(
      `/user/org/info`,
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );

    return OrganizationManagementSchema.parse(
      response?.data
    );
  };

export const useGetOrganizationInfo = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getOrganizationInfo(),
      queryKey: [adminQueryKeys.organizationDetail.info],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
