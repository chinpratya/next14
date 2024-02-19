import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const closeRequest = (
  requestId: string,
  payload: Record<string, unknown>
): Promise<void> =>
  apiClient.post(`/request/${requestId}/close`, payload, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseCloseRequest = {
  requestId: string;
  onSuccess?: () => void;
};

export const useCloseRequest = ({
  requestId,
  onSuccess,
}: UseCloseRequest) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      closeRequest(requestId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.request.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
