import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateDataElement = {
  dataElementId: string;
  data: Record<string, unknown>;
};

export const updateDataElement = async ({
  dataElementId,
  data,
}: UpdateDataElement): Promise<void> => {
  return apiClient.put(
    `/data-element/${dataElementId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
};

export type UseUpdateDataElement = {
  dataElementId: string;
  onSuccess?: () => void;
};

export const useUpdateDataElement = ({
  dataElementId,
  onSuccess,
}: UseUpdateDataElement) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateDataElement({ dataElementId, data }),
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
  };
};
