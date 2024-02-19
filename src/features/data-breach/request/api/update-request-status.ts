import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateRequestStatus = {
  requestId: string;
  data: Record<string, unknown>;
};

export const updateRequestStatus = async ({
  requestId,
  data,
}: UpdateRequestStatus): Promise<void> => {
  return apiClient.put(
    `/request/${requestId}/status`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UseUpdateRequestStatus = {
  requestId: string;
  onSuccess?: () => void;
};

export const useUpdateRequestStatus = ({
  requestId,
  onSuccess,
}: UseUpdateRequestStatus) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRequestStatus({ requestId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.request.detail(requestId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
