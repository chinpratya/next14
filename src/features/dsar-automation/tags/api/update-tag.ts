import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTag = (
  tagId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/tagdsar/${tagId}`, data, {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
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
        dsarAutomationQueryKeys.tags.all,
      ]);
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.tags.detail(tagId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
