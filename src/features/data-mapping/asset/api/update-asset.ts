import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateAsset = async (
  payload: Record<string, unknown>
): Promise<void> => {
  return apiClient.put(
    `/asset/${payload.assetID}`,
    payload,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseUpdateAsset = {
  assetId: string;
  onSuccess?: () => void;
};

export const useUpdateAsset = ({
  assetId,
  onSuccess,
}: UseUpdateAsset) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: updateAsset,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.asset.detail(assetId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
