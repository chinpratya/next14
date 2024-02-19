import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteDataController = (
  dataControllerId: string
) =>
  apiClient.delete(
    `/data-processor/${dataControllerId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseDeleteDataController = {
  onSuccess?: () => void;
};

export const useDeleteDataController = ({
  onSuccess,
}: UseDeleteDataController = {}) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDataController,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataController.all,
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
