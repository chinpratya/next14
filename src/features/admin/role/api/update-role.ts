import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRole = (
  roleId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/user/org/role/${roleId}`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseUpdateRole = {
  roleId: string;
  onSuccess?: () => void;
};

export const useUpdateRole = ({
  roleId,
  onSuccess,
}: UseUpdateRole) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRole(roleId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.role.detail(roleId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
