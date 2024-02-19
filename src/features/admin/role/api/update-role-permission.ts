import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRolePermission = (
  roleId: string,
  permissionKeys: string[]
) =>
  apiClient.post(
    `/user/org/role/${roleId}/permission`,
    {
      permissionId: permissionKeys,
    },
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

export type UseUpdateRolePermission = {
  roleId: string;
  onSuccess?: () => void;
};

export const useUpdateRolePermission = ({
  roleId,
  onSuccess,
}: UseUpdateRolePermission) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (permissionKeys: string[]) =>
      updateRolePermission(roleId, permissionKeys),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.role.permission(roleId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
