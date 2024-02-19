import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createInitPassword = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/user/org/init-password`, data, {
    baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
  });

export type UseCreateInitPassword = {
  onSuccess?: () => void;
};

export const useCreateInitPassword = ({
  onSuccess,
}: UseCreateInitPassword = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createInitPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        adminQueryKeys.password.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
