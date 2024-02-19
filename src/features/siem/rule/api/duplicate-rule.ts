import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type Payload = {
  id: string;
  name: string;
};

export const duplicateRule = (
  payload: Payload
): Promise<void> => {
  return apiClient.post(`/siem/rule/clone`, payload, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDuplicateRule = {
  onSuccess?: () => void;
};

export const useDuplicateRule = ({
  onSuccess,
}: UseDuplicateRule) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: duplicateRule,
    onSuccess: () => {
      queryClient.invalidateQueries([
        siemQueryKeys.rule.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
