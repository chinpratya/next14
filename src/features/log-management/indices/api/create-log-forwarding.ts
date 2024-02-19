import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createLogForwarding = async (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/forwarding`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseCreateLogForwarding = {
  onSuccess?: () => void;
};

export const useCreateLogForwarding = ({
  onSuccess,
}: UseCreateLogForwarding) => {
  const { mutate, isLoading, data, isError } =
    useMutation({
      mutationFn: createLogForwarding,
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          logQueryKeys.forwarding.all,
        ]);
        onSuccess?.();
      },
    });

  return {
    submit: mutate,
    isLoading,
    data,
    isError,
  };
};
