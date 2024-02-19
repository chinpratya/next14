import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createWhitelist = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/whitelist`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateWhitelist = {
  onSuccess?: () => void;
};

export const useCreateWhitelist = ({
  onSuccess,
}: UseCreateWhitelist) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createWhitelist,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.whitelist.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
