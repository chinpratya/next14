import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

export const getRolePermission = async (
  roleId: string
) => {
  const response = await apiClient.get(
    `/user/org/role/${roleId}/permission`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return z
    .array(z.string())
    .parse(response.data.permissionId);
};

export type UseGetRolePermission = {
  roleId: string;
  onSuccess?: (permissionIds: string[]) => void;
};

export const useGetRolePermission = ({
  roleId,
  onSuccess,
}: UseGetRolePermission) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.role.permission(roleId)],
      queryFn: () => getRolePermission(roleId),
      onSuccess: (permissionIds) => {
        onSuccess?.(permissionIds);
      },
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
