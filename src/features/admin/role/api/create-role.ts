import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRole = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/user/org/role`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreateRole = {
  onSuccess?: () => void;
};

export const useCreateRole = ({
  onSuccess,
}: UseCreateRole = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createRole,
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
