import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

type GetPermission = {
  condition?: 'and' | 'or';
  permissions?: string[];
};

export const getPermission = async ({
  condition = 'and',
  permissions,
}: GetPermission): Promise<void> =>
  await apiClient.post(
    `/user/auth/permission`,
    { permissions },
    {
      params: { condition },
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

type UseGetPermission = GetPermission;

export const useGetPermission = ({
  condition,
  permissions,
}: UseGetPermission) => {
  const { data, isFetching, isError } = useQuery({
    queryFn: () =>
      getPermission({ condition, permissions }),
    queryKey: [
      adminQueryKeys.user.permission,
      condition,
      permissions,
    ],
    enabled: !!permissions,
  });

  return {
    data,
    isLoading: isFetching,
    isError,
  };
};
