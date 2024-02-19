import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type DeleteDataLifecycle = {
  dataLifecycleId: string;
};

export const deleteDataLifecycle = ({
  dataLifecycleId,
}: DeleteDataLifecycle) =>
  apiClient.delete(
    `/data-life-cycle/${dataLifecycleId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseDeleteDataLifecycle = {
  onSuccess?: () => void;
};

export const useDeleteDataLifecycle = ({
  onSuccess,
}: UseDeleteDataLifecycle = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (dataLifecycleId: string) =>
      deleteDataLifecycle({ dataLifecycleId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.dataLifecycle.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
