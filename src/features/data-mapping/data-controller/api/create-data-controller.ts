import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createDataController = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/data-processor`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });

export type UseCreateDataController = {
  onSuccess?: () => void;
};

export const useCreateDataController = ({
  onSuccess,
}: UseCreateDataController) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createDataController,
    onSuccess: () => {
      queryClient.invalidateQueries([
        dataMappingQueryKeys.dataController.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
