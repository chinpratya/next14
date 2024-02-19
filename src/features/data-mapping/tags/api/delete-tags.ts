import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deleteTags = async (
  TagId: string
): Promise<void> => {
  return apiClient.delete(`/tag/${TagId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseDeleteTags = {
  onSuccess?: () => void;
};

export const useDeleteTags = ({
  onSuccess,
}: UseDeleteTags) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteTags,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.tags.all,
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
