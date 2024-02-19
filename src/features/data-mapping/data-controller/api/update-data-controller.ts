import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDataController = {
  dataControllerId: string;
  data: Record<string, unknown>;
};

export const updateDataController = async ({
  dataControllerId,
  data,
}: UpdateDataController) =>
  apiClient.put(
    `/data-processor/${dataControllerId}`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateDataController = {
  dataControllerId: string;
  onSuccess?: () => void;
};

export const useUpdateDataController = ({
  dataControllerId,
  onSuccess,
}: UseUpdateDataController) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateDataController({
        dataControllerId,
        data,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataController.detail(
          dataControllerId
        ),
      ]);
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
