import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const deleteIndice = async (
  indiceId: string
): Promise<void> => {
  return apiClient.delete(`/log/indices/${indiceId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteIndice = {
  onSuccess?: () => void;
};

export const useDeleteIndice = ({
  onSuccess,
}: UseDeleteIndice) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteIndice,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries([
          logQueryKeys.indices.all,
        ]),
        queryClient.invalidateQueries([
          logQueryKeys.indices.storageSize,
        ]),
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
