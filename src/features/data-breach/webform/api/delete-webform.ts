import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteWebform = (
  webformId: string
): Promise<void> =>
  apiClient.delete(`/webfrom/${webformId}`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseDeleteWebform = {
  onSuccess?: () => void;
};

export const useDeleteWebform = ({
  onSuccess,
}: UseDeleteWebform = {}) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteWebform,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.webform.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
