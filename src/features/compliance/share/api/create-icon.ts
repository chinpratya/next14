import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryClient } from '@/lib/react-query';

export const createIcon = async (
  payload: Record<string, unknown>
) =>
  await apiClient.post(`/icon`, payload, {
    baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
  });

export type UseCreateIcon = {
  onSuccess?: () => void;
};

export const useCreateIcon = ({
  onSuccess,
}: UseCreateIcon = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createIcon,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.icon.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
