import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateRequestLanguage = {
  data: Record<string, unknown>;
  requestId: string;
};

export const updateRequestLanguage = async ({
  data,
  requestId,
}: UpdateRequestLanguage): Promise<void> => {
  return apiClient.put(
    `/request/language/${requestId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UseUpdateRequestLanguage = {
  onSuccess?: () => void;
  requestId: string;
};

export const useUpdateRequestLanguage = ({
  onSuccess,
  requestId,
}: UseUpdateRequestLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateRequestLanguage({
        data,
        requestId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
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
