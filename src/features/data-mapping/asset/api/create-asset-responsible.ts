import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type CreateAssetResponsible = {
  assetId: string;
  responsibleId: string[];
};

export const createAssetResponsible = ({
  assetId,
  responsibleId,
}: CreateAssetResponsible): Promise<void> => {
  return apiClient.post(
    `/asset/${assetId}/responsible`,
    { responsibleID: responsibleId },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

type UseCreateAssetResponsible = {
  assetId: string;
  onSuccess?: () => void;
};

export const useCreateAssetResponsible = ({
  assetId,
  onSuccess,
}: UseCreateAssetResponsible) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createAssetResponsible,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.assetResponsible.all(
          assetId
        ),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
