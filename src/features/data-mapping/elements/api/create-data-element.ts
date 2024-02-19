import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createDataElement = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/data-element`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

type UseCreateDataElement = {
  onSuccess?: () => void;
};

export const useCreateDataElement = ({
  onSuccess,
}: UseCreateDataElement) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createDataElement,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataElement.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
