import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { UserOrganizationResponseSchema } from '../schemas';
import { UserOrganizationResponse } from '../types';

export const listOrganizationOfUser =
  async (): Promise<UserOrganizationResponse> => {
    const response = await apiClient.get(
      `/user/auth/org`,
      {
        baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
      }
    );
    return UserOrganizationResponseSchema.parse(response);
  };

export const useListOrganizationOfUser = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listOrganizationOfUser(),
      queryKey: [adminQueryKeys.user.organization],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
