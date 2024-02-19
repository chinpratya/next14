import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateTags = {
  tagId: string;
  data: Record<string, unknown>;
};

export const updateTags = async ({
  data,
  tagId,
}: UpdateTags): Promise<void> => {
  return apiClient.put(`/tag/${tagId}`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseUpdateTags = {
  tagId: string;
  onSuccess?: () => void;
};

export const useUpdateTags = ({
  tagId,
  onSuccess,
}: UseUpdateTags) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTags({ tagId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.tags.detail(tagId),
      ]);
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
