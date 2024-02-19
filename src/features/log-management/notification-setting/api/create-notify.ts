import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createNotify = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/core/notify`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateNotify = {
  onSuccess?: () => void;
};

export const useCreateNotify = ({
  onSuccess,
}: UseCreateNotify) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createNotify,
    onSuccess: () => {
      queryClient.invalidateQueries([
        coreQueryKeys.notify.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
