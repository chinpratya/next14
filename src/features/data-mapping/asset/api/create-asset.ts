import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createAsset = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/asset`, data, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

type UseCreateAsset = {
  onSuccess?: () => void;
};

export const useCreateAsset = ({
  onSuccess,
}: UseCreateAsset) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createAsset,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.asset.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
