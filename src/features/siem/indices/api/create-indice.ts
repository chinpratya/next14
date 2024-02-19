import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createIndice = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/indices`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateIndiceOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCreateIndice = ({
  onSuccess,
  onError,
}: UseCreateIndiceOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createIndice,
    onSuccess: async () => {
      queryClient.invalidateQueries([
        logQueryKeys.indices.storageSize,
      ]),
        await queryClient.invalidateQueries([
          logQueryKeys.indices.all,
        ]),
        onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return { submit, isLoading };
};
