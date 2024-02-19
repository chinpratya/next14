import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

export const createMaturityModel = (
  data: Record<string, unknown>
) =>
  apiClient.post(`/setting/matutity-model`, data, {
    baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
  });

export type UseCreateMaturityModel = {
  onSuccess?: () => void;
};

export const useCreateMaturityModel = ({
  onSuccess,
}: UseCreateMaturityModel) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createMaturityModel,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
