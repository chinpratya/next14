import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deleteAsset = async (
  assetId: string
): Promise<void> => {
  return apiClient.delete(`/asset/${assetId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });
};

export type UseDeleteAsset = {
  onSuccess?: () => void;
};

export const useDeleteAsset = ({
  onSuccess,
}: UseDeleteAsset) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteAsset,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.asset.all,
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
