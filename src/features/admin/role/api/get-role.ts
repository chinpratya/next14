import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { RoleSchema } from '../schemas';
import { Role } from '../types';

export const getRole = async (
  roleId: string
): Promise<Role> => {
  const response = await apiClient.get(
    `/user/org/role/${roleId}`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return RoleSchema.parse(response.data);
};

export const useGetRole = (roleId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.role.detail(roleId)],
      queryFn: () => getRole(roleId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
