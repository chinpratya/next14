import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteTag = (tagId: string) =>
  apiClient.delete(`/tagdsar/${tagId}`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseDeleteTag = {
  onSuccess?: () => void;
};

export const useDeleteTag = ({
  onSuccess,
}: UseDeleteTag) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
