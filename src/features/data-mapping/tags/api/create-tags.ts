import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createTags = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/tag`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

type UseCreateTags = {
  onSuccess?: () => void;
};

export const useCreateTags = ({
  onSuccess,
}: UseCreateTags) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createTags,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.tags.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
