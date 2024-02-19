import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createRule = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/siem/rule`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateRule = {
  onSuccess?: () => void;
};

export const useCreateRule = ({
  onSuccess,
}: UseCreateRule = {}) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createRule,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        siemQueryKeys.rule.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
