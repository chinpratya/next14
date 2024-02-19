import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateWebform = {
  webformId: string;
  data: Record<string, unknown>;
};

export const updateWebform = async ({
  webformId,
  data,
}: UpdateWebform): Promise<void> => {
  return apiClient.put(`/webfrom/${webformId}`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });
};

export type UseUpdateWebform = {
  webformId: string;
  onSuccess?: () => void;
};

export const useUpdateWebform = ({
  webformId,
  onSuccess,
}: UseUpdateWebform) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateWebform({ webformId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.detail(webformId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
