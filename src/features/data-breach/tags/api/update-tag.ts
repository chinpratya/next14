import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTag = (
  tagId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/tagdsar/${tagId}`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseUpdateTag = {
  tagId: string;
  onSuccess?: () => void;
};

export const useUpdateTag = ({
  tagId,
  onSuccess,
}: UseUpdateTag) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTag(tagId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.tags.all,
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.tags.detail(tagId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
