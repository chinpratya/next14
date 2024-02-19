import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { profileQueryKeys } from '@/lib/queryKeys';

import { RoleResponseSchema } from '../schemas';
import { RoleResponse } from '../types';

export const getRole =
  async (): Promise<RoleResponse> => {
    const response = await apiClient.get(
      `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/auth/role`
    );

    return RoleResponseSchema.parse(response);
  };

export const useGetRole = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [profileQueryKeys.role.all],
      queryFn: () => getRole(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
