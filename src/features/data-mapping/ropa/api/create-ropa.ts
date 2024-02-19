import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRopa = async (
  data: Record<string, unknown>
): Promise<void> => {
  await apiClient.post(`/ropa`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseCreateRopa = {
  onSuccess?: () => void;
};

export const useCreateRopa = ({
  onSuccess,
}: UseCreateRopa) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createRopa,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.ropa.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
