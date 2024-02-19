import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

type DeleteAssetResponsible = {
  assetId: string;
  responsibleId: string;
};

export const deleteAssetResponsible = async ({
  assetId,
  responsibleId,
}: DeleteAssetResponsible): Promise<void> => {
  return apiClient.delete(
    `/asset/${assetId}/responsible/${responsibleId}`,
    { baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL }
  );
};

export type UseDeleteAssetResponsible = {
  assetId: string;
  onSuccess?: () => void;
};

export const useDeleteAssetResponsible = ({
  assetId,
  onSuccess,
}: UseDeleteAssetResponsible) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteAssetResponsible,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.assetResponsible.all(
          assetId
        ),
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
