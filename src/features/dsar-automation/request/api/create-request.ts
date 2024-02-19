import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRequest = async (
  data: Record<string, unknown>
): Promise<void> => {
  await apiClient.post(`/request`, data, {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
  });
};

export type UseCreateRequest = {
  onSuccess?: () => void;
};

export const useCreateRequest = ({
  onSuccess,
}: UseCreateRequest) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
