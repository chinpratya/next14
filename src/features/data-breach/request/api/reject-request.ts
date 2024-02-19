import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const rejectRequest = (
  requestId: string,
  payload: Record<string, unknown>
): Promise<void> =>
  apiClient.post(
    `/request/${requestId}/reject`,
    payload,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseRejectRequest = {
  requestId: string;
  onSuccess?: () => void;
};

export const useRejectRequest = ({
  requestId,
  onSuccess,
}: UseRejectRequest) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      rejectRequest(requestId, payload),
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
