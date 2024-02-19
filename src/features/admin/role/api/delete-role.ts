import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteRole = (roleId: string) =>
  apiClient.delete(`/user/org/role/${roleId}`, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseDeleteRole = {
  onSuccess?: () => void;
};

export const useDeleteRole = ({
  onSuccess,
}: UseDeleteRole) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.role.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
