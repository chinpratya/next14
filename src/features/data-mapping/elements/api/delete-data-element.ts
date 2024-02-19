import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys/data-mapping';
import { queryClient } from '@/lib/react-query';

export const deleteDataElement = async (
  dataElementId: string
): Promise<void> => {
  return apiClient.delete(
    `/data-element/${dataElementId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseDeleteDataElement = {
  onSuccess?: () => void;
};

export const useDeleteDataElement = ({
  onSuccess,
}: UseDeleteDataElement) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDataElement,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataElement.all,
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
